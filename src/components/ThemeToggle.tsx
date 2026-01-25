import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass hover:bg-muted/50 transition-all duration-300 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      )}
      
      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-card text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
