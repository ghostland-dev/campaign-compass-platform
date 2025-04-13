
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Appliquer le thème stocké avant le rendu React
const applyStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme === 'dark' || 
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Appliquer le thème au chargement initial
applyStoredTheme();

// Mettre en place un écouteur pour les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'system') {
    applyStoredTheme();
  }
});

// Initialiser l'application
createRoot(document.getElementById("root")!).render(<App />);
