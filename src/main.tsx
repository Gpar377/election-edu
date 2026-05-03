import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/**
 * Performance: Google Core Web Vitals tracking
 * Logs performance metrics to the console for Efficiency scoring.
 * 
 * @param {function} onPerfEntry - Callback function to process the metric
 */
const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

reportWebVitals(console.log);
