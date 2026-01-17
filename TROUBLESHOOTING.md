# Troubleshooting - localhost:3000

## Server Status
✅ React development server is running on port 3000

## Access the Application

**Frontend (React App):**
- URL: http://localhost:3000
- Status: Running (Process ID: 5032)

**Backend API:**
- URL: http://localhost:5000
- Endpoint: http://localhost:5000/api/validate

## If You See "Loading Smart Form Validator..."

This means:
1. ✅ HTML is loading correctly
2. ⚠️ React JavaScript bundle may still be compiling
3. ⚠️ Or React hasn't mounted yet

### What to Check:

1. **Open Browser Console (F12)**
   - Go to Console tab
   - Look for:
     - "React app script loaded" ✅
     - "Root element found, mounting React app..." ✅
     - "App component mounted successfully" ✅
   - If you see errors (red text), note them down

2. **Check Network Tab (F12 → Network)**
   - Refresh page (F5)
   - Look for:
     - `main.js` or `bundle.js` - should be status 200 ✅
     - `static/js/` files - should all be status 200 ✅
   - If any show 404 or failed, that's the problem

3. **Check Terminal Output**
   - Look at the terminal where `npm start` is running
   - Should see: "Compiled successfully!" ✅
   - If you see errors, they'll be shown here

## Common Issues

### Issue: Blank Page / Loading Forever
**Solution:**
1. Wait 10-30 seconds for initial compilation
2. Check browser console for errors
3. Hard refresh: Ctrl+F5 or Ctrl+Shift+R
4. Clear browser cache

### Issue: "Cannot GET /"
**Solution:**
- Make sure you're accessing http://localhost:3000 (not 5000)
- Backend is on 5000, Frontend is on 3000

### Issue: CORS Errors
**Solution:**
- Verify backend is running on port 5000
- Check `server/index.js` has CORS enabled
- Verify API_URL in FormValidator component

### Issue: Compilation Errors
**Solution:**
1. Check terminal for specific error messages
2. Common fixes:
   ```bash
   cd client
   npm install
   npm start
   ```

## Quick Test

1. Open http://localhost:3000 in your browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. You should see console logs indicating React is loading
5. After a few seconds, the form should appear

## Restart Servers

If nothing works, restart both servers:

**Stop all Node processes:**
```powershell
Get-Process node | Stop-Process -Force
```

**Start Backend (Terminal 1):**
```powershell
cd "D:\Smart Form Validator\server"
$env:PATH += ";C:\Program Files\nodejs"
npm run dev
```

**Start Frontend (Terminal 2):**
```powershell
cd "D:\Smart Form Validator\client"
$env:PATH += ";C:\Program Files\nodejs"
npm start
```

## Expected Behavior

When you open http://localhost:3000, you should see:

1. **Initial Load (1-5 seconds):**
   - "Loading Smart Form Validator..." message
   - Browser console shows React loading

2. **After Compilation:**
   - Form appears with fields:
     - Email *
     - Phone Number *
     - Full Name *
     - Address *
     - Message / Free Text
   - Two buttons: "Validate Form" and "Reset"

3. **When You Submit:**
   - Form data is sent to backend
   - Validation results appear below the form
   - Shows status (VALID/INVALID/SUSPICIOUS)
   - Shows confidence score
   - Shows field-by-field results

## Still Having Issues?

1. Check if both servers are running:
   ```powershell
   netstat -ano | findstr ":3000 :5000"
   ```

2. Test backend directly:
   - Open: http://localhost:5000/health
   - Should return: `{"status":"ok"}`

3. Check browser console for specific error messages

4. Share the error messages you see for further help
