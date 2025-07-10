import React, { createContext, useEffect, useState } from 'react';

export const ThemeColor = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState('Light');

  const ToggleFunc = () => {
    setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'));
  };

  useEffect(() => {
    if (theme === 'Dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <ThemeColor.Provider value={{ theme, ToggleFunc }}>
      {children}
    </ThemeColor.Provider>
  );
};

export default ThemeContext;
