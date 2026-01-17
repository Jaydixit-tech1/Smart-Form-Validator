import React, { useEffect } from 'react';
import './App.css';
import FormValidator from './components/FormValidator';

function App() {
  useEffect(() => {
    console.log('App component mounted successfully');
    // Remove loading message if it exists
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
      loadingElement.remove();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Form Validator</h1>
        <p>AI-powered form validation with security threat detection</p>
      </header>
      <main>
        <FormValidator />
      </main>
    </div>
  );
}

export default App;
