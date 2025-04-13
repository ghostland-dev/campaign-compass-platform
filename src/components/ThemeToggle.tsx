
import React, { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

    // Listen for changes to the system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

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

  const setThemePreference = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Get the icon for the current theme
  const getThemeIcon = () => {
    if (theme === 'dark') return <Sun className="h-5 w-5" />;
    if (theme === 'light') return <Moon className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  // Get the tooltip text based on theme
  const getTooltipText = () => {
    if (theme === 'dark') return 'Changer de thème (Sombre)';
    if (theme === 'light') return 'Changer de thème (Clair)';
    return 'Changer de thème (Système)';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground hover:text-foreground/80"
              >
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setThemePreference('light')}>
              <Sun className="h-4 w-4 mr-2" />
              <span>Clair</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setThemePreference('dark')}>
              <Moon className="h-4 w-4 mr-2" />
              <span>Sombre</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setThemePreference('system')}>
              <Monitor className="h-4 w-4 mr-2" />
              <span>Système</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
