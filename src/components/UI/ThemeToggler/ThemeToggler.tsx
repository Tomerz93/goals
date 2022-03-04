import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSun, BsMoon } from 'react-icons/bs';

const ThemeToggler: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const toggle = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
      {theme === 'light' ? (
        <BsMoon onClick={toggle} />
      ) : (
        <BsSun onClick={toggle} />
      )}
    </div>
  );
};

export default ThemeToggler;
