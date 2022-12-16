'use client';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const { setTheme } = useNextTheme();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark')) setDark(true);
    else setDark(false);
  })
  
  return (
    <>
      <Switch
        checked={!dark}
        onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}
        size='xl'
        iconOn={<FontAwesomeIcon icon={faSun} />}
        iconOff={<FontAwesomeIcon icon={faMoon} />}
      />
    </>
  );
};

export default ThemeSwitch;
