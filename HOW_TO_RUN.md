# How to Run the Application

## ❌ DO NOT Open HTML File Directly

**WRONG:**
```
file:///D:/Smart%20Form%20Validator/client/public/index.html
```

This will NOT work because:
- React apps need a development server to compile JavaScript
- Module imports require HTTP/HTTPS protocol
- The dev server handles routing and hot reloading

## ✅ CORRECT Way to Run

### Option 1: Use the Development Server (Recommended)

**URL to use:**
```
http://localhost:3000
```

**Steps:**
1. Make sure the React dev server is running:
   ```powershell
   cd client
   npm start
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Option 2: Quick Access

The server should already be running. Just open:
```
http://localhost:3000
```

## Why file:// Doesn't Work

When you open an HTML file directly:
- ❌ JavaScript modules won't load (CORS restrictions)
- ❌ React won't compile
- ❌ You'll see a blank page or errors
- ❌ No hot reloading
- ❌ No development features

When you use http://localhost:3000:
- ✅ React dev server compiles everything
- ✅ All modules load correctly
- ✅ Hot reloading works
- ✅ Full development experience
- ✅ Proper routing

## Server Status

Check if servers are running:
```powershell
netstat -ano | findstr ":3000 :5000"
```

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5000

## If Server Isn't Running

**Start Frontend:**
```powershell
cd "D:\Smart Form Validator\client"
$env:PATH += ";C:\Program Files\nodejs"
npm start
```

**Start Backend (separate terminal):**
```powershell
cd "D:\Smart Form Validator\server"
$env:PATH += ";C:\Program Files\nodejs"
npm run dev
```

## Quick Links Script

Run this to see all links:
```powershell
.\show-links.ps1
```

Or use:
```powershell
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
```
