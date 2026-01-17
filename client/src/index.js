import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: 'white',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Something went wrong</h1>
          <p style={{ marginBottom: '10px' }}>{this.state.error?.toString()}</p>
          {this.state.errorInfo && (
            <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px' }}>
              <summary>Error Details</summary>
              <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Add console log to verify script is loading
console.log('React app script loaded');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: white; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;"><h1>Error: Root element not found</h1></div>';
} else {
  console.log('Root element found, mounting React app...');
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('React app mounted successfully');
  } catch (error) {
    console.error('Error mounting React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1>Failed to load application</h1>
        <p>${error.toString()}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; font-size: 1rem; cursor: pointer; background: white; color: #667eea; border: none; border-radius: 5px; font-weight: bold;">Reload Page</button>
      </div>
    `;
  }
}
