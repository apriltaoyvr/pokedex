'use client';
import { Navbar, Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Link from 'next/link';

const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Navbar variant={'floating'}>
      <Navbar.Brand>
        <Link href='/'>Pokedex</Link>
      </Navbar.Brand>
      <Navbar.Content></Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          ></Switch>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Nav;
