const fieldValidators = require('./fieldValidators');
const securityDetector = require('./securityDetector');
const llmService = require('./llmService');

class FormValidator {
  async validateForm(formData) {
    const fieldResults = {};
    const securityWarnings = [];
    let validCount = 0;
    let invalidCount = 0;
    let suspiciousCount = 0;
    let totalFields = 0;

    // Validate each field
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      totalFields++;
      const result = await this.validateField(fieldName, fieldValue);
      fieldResults[fieldName] = result;

      // Check for security threats
      const securityIssues = securityDetector.detectThreats(fieldValue);
      if (securityIssues.length > 0) {
        securityWarnings.push(...securityIssues.map(issue => ({
          field: fieldName,
          threat: issue.type,
          message: issue.message
        })));
        if (result.status === 'VALID') {
          result.status = 'SUSPICIOUS';
        }
      }

      // Count statuses
      if (result.status === 'VALID') validCount++;
      else if (result.status === 'INVALID') invalidCount++;
      else suspiciousCount++;
    }

    // Determine overall status
    let overallStatus = 'VALID';
    if (invalidCount > 0 || suspiciousCount > totalFields / 2) {
      overallStatus = 'INVALID';
    } else if (suspiciousCount > 0 || securityWarnings.length > 0) {
      overallStatus = 'SUSPICIOUS';
    }

    // Calculate confidence score
    const confidenceScore = this.calculateConfidenceScore(
      validCount,
      invalidCount,
      suspiciousCount,
      totalFields,
      securityWarnings.length
    );

    return {
      overall_status: overallStatus,
      fields: fieldResults,
      security_warnings: securityWarnings,
      confidence_score: confidenceScore
    };
  }

  async validateField(fieldName, fieldValue) {
    if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
      return {
        status: 'INVALID',
        issues: ['Field is required'],
        suggested_value: ''
      };
    }

    const value = String(fieldValue).trim();
    const issues = [];
    let status = 'VALID';
    let suggestedValue = value;

    // Detect meaningless input
    if (this.isMeaninglessInput(value)) {
      issues.push('Input appears to be meaningless or random');
      status = 'INVALID';
    }

    // Field-specific validation
    const fieldType = this.detectFieldType(fieldName, value);
    const fieldValidation = await fieldValidators.validate(fieldType, value);
    
    if (!fieldValidation.valid) {
      issues.push(...fieldValidation.issues);
      status = fieldValidation.severity === 'critical' ? 'INVALID' : 'SUSPICIOUS';
    }

    // LLM-based advanced validation
    if (value.length > 3) {
      const llmAnalysis = await llmService.analyzeField(fieldName, value, fieldType);
      if (llmAnalysis) {
        if (llmAnalysis.issues && llmAnalysis.issues.length > 0) {
          issues.push(...llmAnalysis.issues);
          if (status === 'VALID' && llmAnalysis.severity === 'high') {
            status = 'SUSPICIOUS';
          } else if (llmAnalysis.severity === 'critical') {
            status = 'INVALID';
          }
        }
        if (llmAnalysis.suggested_value) {
          suggestedValue = llmAnalysis.suggested_value;
        }
      }
    }

    return {
      status: status,
      issues: issues,
      suggested_value: suggestedValue !== value ? suggestedValue : ''
    };
  }

  detectFieldType(fieldName, value) {
    const name = fieldName.toLowerCase();
    
    if (name.includes('email') || name.includes('e-mail')) {
      return 'email';
    } else if (name.includes('phone') || name.includes('tel') || name.includes('mobile')) {
      return 'phone';
    } else if (name.includes('name') && !name.includes('company') && !name.includes('business')) {
      return 'name';
    } else if (name.includes('address') || name.includes('street') || name.includes('city') || name.includes('zip')) {
      return 'address';
    } else {
      return 'text';
    }
  }

  isMeaninglessInput(value) {
    const str = value.toLowerCase().trim();
    
    // Check for repeated characters (e.g., "aaa", "1111")
    if (/^(.)\1{2,}$/.test(str)) {
      return true;
    }
    
    // Check for keyboard patterns (e.g., "asdf", "qwerty")
    const keyboardPatterns = ['asdf', 'qwerty', 'zxcv', 'hjkl'];
    if (keyboardPatterns.some(pattern => str.includes(pattern))) {
      return true;
    }
    
    // Check for very short meaningless strings
    if (str.length <= 2 && /^[a-z]{1,2}$/i.test(str)) {
      return true;
    }
    
    return false;
  }

  calculateConfidenceScore(valid, invalid, suspicious, total, securityWarnings) {
    if (total === 0) return 0;
    
    let score = (valid / total) * 100;
    
    // Reduce score for suspicious fields
    score -= (suspicious / total) * 30;
    
    // Reduce score for invalid fields
    score -= (invalid / total) * 50;
    
    // Reduce score for security warnings
    score -= securityWarnings * 10;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }
}

module.exports = new FormValidator();
