# Setup Instructions for Smart Form Validator

## Prerequisites

You need to have **Node.js** installed on your system to run this application.

### Installing Node.js

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js:**
   - Run the installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation
   - Restart your terminal/command prompt after installation

3. **Verify Installation:**
   Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```
   Both commands should return version numbers.

## After Installing Node.js

Once Node.js is installed, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm run install-all
   ```
   This will install dependencies for root, server, and client.

2. **Set Up Environment Variables (Optional):**
   - Create a file named `.env` in the `server` directory
   - Add your LLM API key if you want advanced grammar/spelling validation:
     ```
     PORT=5000
     LLM_API_KEY=your_api_key_here
     LLM_API_URL=https://api.openai.com/v1/chat/completions
     LLM_MODEL=gpt-3.5-turbo
     ```
   - **Note:** The app works without an LLM API key, but advanced features will be disabled.

3. **Start the Application:**
   ```bash
   npm run dev
   ```
   This starts both the backend server (port 5000) and frontend (port 3000).

4. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Alternative: Run Servers Separately

If you prefer to run them separately:

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm start
```

## Troubleshooting

- **"npm is not recognized"**: Node.js is not installed or not in PATH. Reinstall Node.js and restart terminal.
- **Port already in use**: Change PORT in `server/.env` or stop the process using the port.
- **Permission errors**: Run terminal as Administrator if needed.
