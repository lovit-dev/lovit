import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

createRoot(document.querySelector('#root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
