'use client';
import NextLink from 'next/link';
import { Navbar as NavbarUI, Text } from '@nextui-org/react';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <NavbarUI variant='sticky' shouldHideOnScroll>
      <NavbarUI.Brand as='header'>
        <NextLink href='/'>
          <Text
            b
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 100%',
            }}
          >
            Pokedex
          </Text>
        </NextLink>
      </NavbarUI.Brand>
      <NavbarUI.Content hideIn='xs'>
        <Text b>Gotta fetch &apos;em all!</Text>
      </NavbarUI.Content>
      <NavbarUI.Content>
        <ThemeSwitch />
      </NavbarUI.Content>
    </NavbarUI>
  );
};

export default Navbar;
