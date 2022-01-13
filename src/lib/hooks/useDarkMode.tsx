import { useState, useEffect } from 'react';

const matchDarkTheme = '(prefers-color-scheme: dark)';

type UseDarkMode = 'light' | 'dark';

export const useDarkMode = () => {
  const isDarkSet = window?.matchMedia(matchDarkTheme).matches;
  const [theme, setTheme] = useState<UseDarkMode>(() =>
    isDarkSet ? 'dark' : 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };
  useEffect(() => {
    // const listener = window.matchMedia(matchDarkTheme).addEventListener((e) => {
    //   if (e.matches) {
    //     setTheme('dark');
    //   } else {
    //     setTheme('light');
    //   }
    // });
    // return () => {
    //   window.matchMedia(matchDarkTheme).removeEventListener(listener);
    // }
  }, []);
  return [theme, toggleTheme];
};
