'use client';
import { Navbar as NavbarUI, Text } from '@nextui-org/react';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <NavbarUI variant='sticky' shouldHideOnScroll>
      <NavbarUI.Brand as='header'>
        <Text b color='inherit' hideIn='xs'>
          Pokedex
        </Text>
      </NavbarUI.Brand>
      <NavbarUI.Content hideIn='xs'>
        <Text b>Gotta fetch 'em all!</Text>
      </NavbarUI.Content>
      <NavbarUI.Content>
          <ThemeSwitch />
      </NavbarUI.Content>
    </NavbarUI>
  );
};

export default Navbar;
