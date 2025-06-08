import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update CSS variables when theme changes
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--text', '#ffffff');
      document.documentElement.style.setProperty('--background', '#000000');
      document.documentElement.style.setProperty('--text-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--background-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--border', '#333333');
      document.documentElement.style.setProperty('--code-bg', '#1e1e1e');
      document.documentElement.style.setProperty('--accent', '#0070f3');
    } else {
      document.documentElement.style.setProperty('--text', '#000000');
      document.documentElement.style.setProperty('--background', '#ffffff');
      document.documentElement.style.setProperty('--text-rgb', '0, 0, 0');
      document.documentElement.style.setProperty('--background-rgb', '255, 255, 255');
      document.documentElement.style.setProperty('--border', '#e5e5e5');
      document.documentElement.style.setProperty('--code-bg', '#f8f8f8');
      document.documentElement.style.setProperty('--accent', '#0070f3');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 