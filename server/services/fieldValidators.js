const validator = require('validator');

class FieldValidators {
  validate(fieldType, value) {
    switch (fieldType) {
      case 'email':
        return this.validateEmail(value);
      case 'phone':
        return this.validatePhone(value);
      case 'name':
        return this.validateName(value);
      case 'address':
        return this.validateAddress(value);
      case 'text':
        return this.validateText(value);
      default:
        return { valid: true, issues: [], severity: 'low' };
    }
  }

  validateEmail(value) {
    const issues = [];
    let severity = 'low';

    if (!validator.isEmail(value)) {
      issues.push('Invalid email format');
      severity = 'critical';
    } else {
      // Additional checks
      const emailParts = value.split('@');
      if (emailParts[0].length > 64) {
        issues.push('Email local part exceeds maximum length');
        severity = 'high';
      }
      
      // Check for suspicious patterns
      if (/\d{5,}/.test(emailParts[0])) {
        issues.push('Email contains suspicious number pattern');
        severity = 'medium';
      }
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      severity: severity
    };
  }

  validatePhone(value) {
    const issues = [];
    let severity = 'low';

    // Remove common formatting characters
    const cleaned = value.replace(/[\s\-\(\)\.\+]/g, '');
    
    // Check if it's a valid phone number format
    if (!/^\d{10,15}$/.test(cleaned)) {
      issues.push('Invalid phone number format');
      severity = 'critical';
    } else if (cleaned.length < 10) {
      issues.push('Phone number too short');
      severity = 'high';
    } else if (cleaned.length > 15) {
      issues.push('Phone number too long');
      severity = 'high';
    }

    // Check for suspicious patterns (all same digits, sequential, etc.)
    if (/^(\d)\1{6,}$/.test(cleaned)) {
      issues.push('Phone number contains suspicious pattern');
      severity = 'medium';
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      severity: severity
    };
  }

  validateName(value) {
    const issues = [];
    let severity = 'low';

    if (value.length < 2) {
      issues.push('Name is too short');
      severity = 'high';
    } else if (value.length > 100) {
      issues.push('Name is too long');
      severity = 'high';
    }

    // Check for valid name characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) {
      issues.push('Name contains invalid characters');
      severity = 'high';
    }

    // Check for numbers (usually invalid in names)
    if (/\d/.test(value)) {
      issues.push('Name should not contain numbers');
      severity = 'medium';
    }

    // Check for excessive capitalization
    if (value.split(' ').every(word => /^[A-Z]+$/.test(word)) && value.length > 5) {
      issues.push('Name appears to be in all caps');
      severity = 'low';
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      severity: severity
    };
  }

  validateAddress(value) {
    const issues = [];
    let severity = 'low';

    if (value.length < 5) {
      issues.push('Address is too short');
      severity = 'high';
    } else if (value.length > 200) {
      issues.push('Address is too long');
      severity = 'high';
    }

    // Check for at least one number (street numbers)
    if (!/\d/.test(value)) {
      issues.push('Address should typically contain a street number');
      severity = 'low';
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      severity: severity
    };
  }

  validateText(value) {
    const issues = [];
    let severity = 'low';

    if (value.length < 1) {
      issues.push('Text field cannot be empty');
      severity = 'high';
    } else if (value.length > 10000) {
      issues.push('Text field exceeds maximum length');
      severity = 'high';
    }

    // Check for excessive whitespace
    if (value.trim().length === 0) {
      issues.push('Text field contains only whitespace');
      severity = 'high';
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      severity: severity
    };
  }
}

module.exports = new FieldValidators();
