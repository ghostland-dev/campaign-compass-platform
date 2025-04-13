
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply theme on initial load before React renders
const applyStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme === 'dark' || 
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

applyStoredTheme();

createRoot(document.getElementById("root")!).render(<App />);
