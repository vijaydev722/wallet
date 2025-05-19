import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_theme } from './reducers/wallet-reducer';

function useThemeSwitcher() {
  const dispatch = useDispatch();
  const storeTheme = useSelector((state) => state.wallet);
  const [theme, setTheme] = useState(() => {
    return storeTheme.theme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    dispatch(set_theme(theme));
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useThemeSwitcher;