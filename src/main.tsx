import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Service Worker Registration for Development
if ('serviceWorker' in navigator && import.meta.env.DEV) {
  window.addEventListener('load', () => {
    // Only register service worker in production or if explicitly needed
    console.log('Service worker available but not registering in development');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
