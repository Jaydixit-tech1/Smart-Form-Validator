import React, { useState } from 'react';
import axios from 'axios';
import './FormValidator.css';
import ValidationResults from './ValidationResults';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function FormValidator() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    message: ''
  });

  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear previous results when user types
    if (validationResult) {
      setValidationResult(null);
    }
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);
    setError(null);
    setValidationResult(null);

    try {
      const response = await axios.post(`${API_URL}/api/validate`, formData);
      setValidationResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to validate form. Please try again.');
      console.error('Validation error:', err);
    } finally {
      setIsValidating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      phone: '',
      name: '',
      address: '',
      message: ''
    });
    setValidationResult(null);
    setError(null);
  };

  return (
    <div className="form-validator">
      <form onSubmit={handleSubmit} className="validation-form">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State 12345"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / Free Text</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here..."
            rows="4"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isValidating}
          >
            {isValidating ? 'Validating...' : 'Validate Form'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isValidating}
          >
            Reset
          </button>
        </div>
      </form>

      {validationResult && (
        <ValidationResults result={validationResult} />
      )}
    </div>
  );
}

export default FormValidator;
