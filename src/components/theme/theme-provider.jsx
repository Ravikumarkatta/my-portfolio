import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme Provider
 * 
 * This component demonstrates:
 * - Context API usage for global state management
 * - System theme detection and user preference handling
 * - Local storage persistence
 * - Reactive theme switching with transitions
 * - Accessibility considerations
 */

// Create theme context
const ThemeContext = createContext({
  theme: "system",
  setTheme: () => null,
  isDarkMode: false,
});

// Custom hook for accessing theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}) {
  // Initialize theme state from localStorage or default
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem(storageKey);
    // Return stored theme if valid, otherwise use default
    return storedTheme || defaultTheme;
  });

  // Track if dark mode is active for easy consumption by components
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update localStorage when theme changes
  const persistTheme = (value) => {
    localStorage.setItem(storageKey, value);
    setTheme(value);
  };

  // Effect to update the DOM when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark");

    // Apply appropriate theme based on user preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === "dark");
    } else {
      root.classList.add(theme);
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);

  // Listen for system theme changes if using system preference
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Update isDarkMode when system preference changes
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
      
      // Also update the DOM classes
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };
    
    // Add event listener
    mediaQuery.addEventListener("change", handleChange);
    
    // Initial check
    handleChange();
    
    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Context value
  const value = {
    theme,
    setTheme: persistTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Theme Toggle Button Component
 * 
 * Provides a user interface for toggling between light, dark, and system themes
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle through the themes: light -> dark -> system -> light
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  // Icon based on current theme
  const renderIcon = () => {
    if (theme === "light") {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    } else if (theme === "dark") {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Current theme: ${theme}. Click to toggle theme.`}
    >
      {renderIcon()}
    </button>
  );
}