🚀 Smart Form Validator

An AI-powered form validation system with a React frontend ⚛️ and Node.js/Express backend 🟢. It validates user input, detects security threats 🔐, and provides intelligent suggestions 🧠 using LLM-based analysis.

✨ Features

✅ Multi-field validation (Email, Phone, Name, Address, Free-text)

🔐 Security threat detection (XSS, SQL Injection, Command Injection)

🚫 Meaningless & spam input detection

✍️ Grammar & spelling analysis (LLM-powered)

💡 Intelligent correction suggestions

⚡ Real-time validation feedback

🎨 Modern & responsive UI

🛠️ Technology Stack

⚛️ Frontend: React.js

🟢 Backend: Node.js with Express

🤖 AI Service: OpenAI-compatible LLM API

🔄 Data Format: JSON

📦 Installation & Setup
npm install
npm run install-all
cd server
cp .env.example .env

PORT=5000
LLM_API_KEY=your_api_key_here
LLM_API_URL=https://api.openai.com/v1/chat/completions
LLM_MODEL=gpt-3.5-turbo

▶️ Run Application
npm run dev

📂 Project Structure
smart-form-validator/
├── client/ ⚛️
├── server/ 🟢
└── package.json

🌐 Frontend: http://localhost:3000

🔌 Backend: http://localhost:5000




