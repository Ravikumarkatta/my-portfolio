import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Check for dark mode preference
const darkModePreference = () => {
  // Check local storage first
  if (localStorage.getItem('darkMode') === 'true') {
    return true;
  }
  
  // Then check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  
  return false;
};

// Apply dark mode class if needed
if (darkModePreference()) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Add smooth scroll polyfill for Safari
if (typeof window !== 'undefined') {
  import('smoothscroll-polyfill').then(smoothscroll => {
    smoothscroll.polyfill();
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Add a service worker for PWA capabilities
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }