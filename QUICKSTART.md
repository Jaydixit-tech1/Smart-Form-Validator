# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd server
   ```
   
   Create `.env` file with the following content:
   ```
   PORT=5000
   LLM_API_KEY=your_api_key_here
   LLM_API_URL=https://api.openai.com/v1/chat/completions
   LLM_MODEL=gpt-3.5-turbo
   ```
   
   **Note:** The application will work without an LLM API key, but advanced grammar/spelling analysis will be disabled.

3. **Start the Application**
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend client (port 3000).

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Testing the API

You can test the API directly using curl:

```bash
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+1234567890",
    "name": "John Doe",
    "address": "123 Main St",
    "message": "Hello world"
  }'
```

## Example Form Data

Try these test cases:

**Valid Input:**
```json
{
  "email": "john.doe@example.com",
  "phone": "+1-555-123-4567",
  "name": "John Doe",
  "address": "123 Main Street, New York, NY 10001",
  "message": "This is a valid message."
}
```

**Invalid Input (for testing):**
```json
{
  "email": "invalid-email",
  "phone": "123",
  "name": "aaa",
  "address": "test",
  "message": "<script>alert('xss')</script>"
}
```

## Troubleshooting

- **Port already in use**: Change the PORT in `server/.env`
- **LLM API errors**: Check your API key and ensure you have credits/quota
- **CORS errors**: Ensure the backend is running and the API_URL in the frontend matches
