const axios = require('axios');

class LLMService {
  constructor() {
    this.apiKey = process.env.LLM_API_KEY || '';
    this.apiUrl = process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions';
    this.enabled = !!this.apiKey;
  }

  async analyzeField(fieldName, value, fieldType) {
    if (!this.enabled || value.length < 3) {
      return null;
    }

    try {
      const prompt = this.buildPrompt(fieldName, value, fieldType);
      const response = await this.callLLM(prompt);
      
      if (response && response.choices && response.choices[0]) {
        const content = response.choices[0].message.content;
        return this.parseLLMResponse(content);
      }
    } catch (error) {
      console.error('LLM service error:', error.message);
      // Fail silently - don't block validation if LLM is unavailable
    }

    return null;
  }

  buildPrompt(fieldName, value, fieldType) {
    return `You are a form validation assistant. Analyze the following form field value and provide feedback.

Field Name: ${fieldName}
Field Type: ${fieldType}
Value: "${value}"

Please analyze this value for:
1. Grammar and spelling errors
2. Meaningfulness and context appropriateness
3. Format correctness
4. Any suspicious patterns

Respond ONLY with a JSON object in this exact format (no markdown, no explanations):
{
  "valid": true/false,
  "issues": ["issue1", "issue2"],
  "severity": "low|medium|high|critical",
  "suggested_value": "corrected value if needed, otherwise empty string",
  "grammar_score": 0-100,
  "meaningfulness_score": 0-100
}

If the value is valid and meaningful, return valid: true with empty issues array.`;
  }

  async callLLM(prompt) {
    if (!this.enabled) {
      return null;
    }

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: process.env.LLM_MODEL || 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a form validation assistant. Always respond with valid JSON only, no markdown formatting.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      return response.data;
    } catch (error) {
      // If using OpenAI-compatible API, try alternative format
      if (error.response?.status === 401 || error.response?.status === 404) {
        console.warn('LLM API authentication failed or model not found. Continuing without LLM validation.');
      }
      return null;
    }
  }

  parseLLMResponse(content) {
    try {
      // Remove markdown code blocks if present
      let jsonStr = content.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '');
      }

      const parsed = JSON.parse(jsonStr);
      
      return {
        issues: parsed.issues || [],
        severity: parsed.severity || 'low',
        suggested_value: parsed.suggested_value || '',
        grammar_score: parsed.grammar_score,
        meaningfulness_score: parsed.meaningfulness_score
      };
    } catch (error) {
      console.error('Failed to parse LLM response:', error.message);
      return null;
    }
  }
}

module.exports = new LLMService();
