import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button 
      className="theme-toggle-btn"
      onClick={onToggle}
      aria-label="Toggle theme mode"
    >
      {theme === 'dark' ? (
        <Sun className="theme-toggle-icon sun-icon" size={20} />
      ) : (
        <Moon className="theme-toggle-icon moon-icon" size={20} />
      )}
    </button>
  );
}
