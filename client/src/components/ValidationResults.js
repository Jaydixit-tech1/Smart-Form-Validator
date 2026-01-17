import React from 'react';
import './ValidationResults.css';

function ValidationResults({ result }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'VALID':
        return '#4caf50';
      case 'INVALID':
        return '#f44336';
      case 'SUSPICIOUS':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'VALID':
        return '✓';
      case 'INVALID':
        return '✗';
      case 'SUSPICIOUS':
        return '⚠';
      default:
        return '?';
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="validation-results">
      <div className="results-header">
        <h2>Validation Results</h2>
        <div className="overall-status" style={{ color: getStatusColor(result.overall_status) }}>
          <span className="status-icon">{getStatusIcon(result.overall_status)}</span>
          <span className="status-text">{result.overall_status}</span>
        </div>
      </div>

      <div className="confidence-score">
        <label>Confidence Score:</label>
        <div className="score-bar-container">
          <div
            className="score-bar"
            style={{
              width: `${result.confidence_score}%`,
              backgroundColor: getConfidenceColor(result.confidence_score)
            }}
          />
          <span className="score-value">{result.confidence_score}%</span>
        </div>
      </div>

      {result.security_warnings && result.security_warnings.length > 0 && (
        <div className="security-warnings">
          <h3>⚠️ Security Warnings</h3>
          <ul>
            {result.security_warnings.map((warning, index) => (
              <li key={index}>
                <strong>{warning.field}:</strong> {warning.threat} - {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="field-results">
        <h3>Field Details</h3>
        {Object.entries(result.fields).map(([fieldName, fieldResult]) => (
          <div key={fieldName} className="field-result">
            <div className="field-header">
              <span className="field-name">{fieldName}</span>
              <span
                className="field-status"
                style={{ color: getStatusColor(fieldResult.status) }}
              >
                {getStatusIcon(fieldResult.status)} {fieldResult.status}
              </span>
            </div>

            {fieldResult.issues && fieldResult.issues.length > 0 && (
              <div className="field-issues">
                <strong>Issues:</strong>
                <ul>
                  {fieldResult.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {fieldResult.suggested_value && fieldResult.suggested_value.trim() !== '' && (
              <div className="field-suggestion">
                <strong>Suggested Value:</strong>
                <div className="suggested-value">{fieldResult.suggested_value}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValidationResults;
