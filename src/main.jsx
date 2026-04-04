import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/config';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failed silently
    });
  });
}
