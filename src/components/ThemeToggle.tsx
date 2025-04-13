
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // Check if theme is set in localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Default to system preference
      setTheme('system');
    }
    
    // Apply the theme
    applyTheme(storedTheme || 'system');
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'dark' || 
        (newTheme === 'system' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
      className="text-foreground hover:text-foreground/80"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
