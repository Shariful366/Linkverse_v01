import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for production
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #1e293b 100%);
      color: white;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 2rem;
    ">
      <div>
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Linkverse 2050</h1>
        <p style="color: #ef4444; margin-bottom: 1rem;">Application failed to load</p>
        <button onclick="window.location.reload()" style="
          background: #2563eb; 
          color: white; 
          border: none; 
          padding: 0.75rem 1.5rem; 
          border-radius: 0.5rem; 
          cursor: pointer;
          font-size: 1rem;
        ">
          Reload Application
        </button>
      </div>
    </div>
  `;
}
