# Debugging Guide - Blank Website Issue

If you're seeing a blank website when debugging, follow these steps:

## 1. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for errors:

**Chrome/Edge:**
- Press F12
- Go to "Console" tab
- Look for red error messages

**Common errors to look for:**
- `Failed to compile`
- `Module not found`
- `Cannot read property...`
- CORS errors
- Network errors

## 2. Check Network Tab

In Developer Tools:
- Go to "Network" tab
- Refresh the page (F5)
- Check if files are loading (status 200) or failing (status 404/500)
- Look for failed requests (shown in red)

## 3. Verify Servers Are Running

**Check Backend (Port 5000):**
```bash
# In PowerShell
netstat -ano | findstr ":5000"
```

**Check Frontend (Port 3000):**
```bash
# In PowerShell
netstat -ano | findstr ":3000"
```

**Test Backend API:**
Open in browser: http://localhost:5000/health
Should return: `{"status":"ok"}`

## 4. Common Issues and Fixes

### Issue: "Cannot GET /"
**Solution:** Make sure you're accessing http://localhost:3000 (not 5000)

### Issue: "Failed to compile"
**Solution:** 
1. Check the terminal where `npm start` is running
2. Look for compilation errors
3. Fix syntax errors in the code

### Issue: CORS Error
**Solution:** 
1. Verify backend server is running on port 5000
2. Check `server/index.js` has CORS enabled
3. Verify API_URL in `client/src/components/FormValidator.js`

### Issue: Blank White Page
**Possible causes:**
1. JavaScript errors preventing React from rendering
2. CSS not loading
3. React app not mounting

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify `#root` element exists in HTML
4. Check if React is loading

## 5. Manual Testing Steps

1. **Clear Browser Cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Refresh page (Ctrl+F5)

2. **Try Different Browser:**
   - Test in Chrome, Firefox, or Edge
   - Some browsers cache more aggressively

3. **Check React DevTools:**
   - Install React Developer Tools extension
   - Check if React components are rendering

4. **Verify File Structure:**
   ```
   client/
     ├── public/
     │   └── index.html (must have <div id="root"></div>)
     ├── src/
     │   ├── index.js
     │   ├── App.js
     │   └── components/
     └── package.json
   ```

## 6. Restart Servers

If nothing works, restart both servers:

**Stop all Node processes:**
```powershell
Get-Process node | Stop-Process -Force
```

**Start Backend:**
```powershell
cd "D:\Smart Form Validator\server"
$env:PATH += ";C:\Program Files\nodejs"
npm run dev
```

**Start Frontend (in new terminal):**
```powershell
cd "D:\Smart Form Validator\client"
$env:PATH += ";C:\Program Files\nodejs"
npm start
```

## 7. Check Terminal Output

Look at the terminal where `npm start` is running:
- Should show "Compiled successfully!"
- Should show "webpack compiled"
- Should NOT show errors

## 8. Quick Test

Create a simple test to verify React is working:

1. Open browser console (F12)
2. Type: `document.getElementById('root')`
3. Should return the root element (not null)
4. Check if React is loaded: `window.React`

## Still Having Issues?

1. Check if all dependencies are installed:
   ```bash
   cd client
   npm install
   ```

2. Delete node_modules and reinstall:
   ```bash
   cd client
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
