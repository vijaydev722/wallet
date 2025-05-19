import React from 'react';
import useThemeSwitcher from '../ThemeContext';

function ToggleButton() {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div onClick={toggleTheme} style={{cursor:'pointer', fontSize:10, textAlign:'end'}}>
     Theme: {theme === 'light' ? ( <span role="img" aria-label="Light Mode">☀️</span> ) : (
        <span role="img" aria-label="Dark Mode">🌙</span>
      )}
    </div>
  );
}

export default ToggleButton;