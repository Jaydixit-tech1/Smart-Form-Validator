const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formValidator = require('./services/formValidator');
const llmService = require('./services/llmService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main validation endpoint
app.post('/api/validate', async (req, res) => {
  try {
    const formData = req.body;
    
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({
        overall_status: 'INVALID',
        fields: {},
        security_warnings: ['Invalid request format'],
        confidence_score: 0
      });
    }

    const validationResult = await formValidator.validateForm(formData);
    res.json(validationResult);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      overall_status: 'INVALID',
      fields: {},
      security_warnings: ['Internal server error'],
      confidence_score: 0
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
