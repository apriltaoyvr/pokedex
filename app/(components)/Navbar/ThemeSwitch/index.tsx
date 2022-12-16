'use client';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  
  return (
    <>
      <Switch
        checked={!isDark}
        onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}
        size='xl'
        iconOn={<FontAwesomeIcon icon={faSun} />}
        iconOff={<FontAwesomeIcon icon={faMoon} />}
      />
    </>
  );
};

export default ThemeSwitch;
