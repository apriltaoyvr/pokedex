import { useTheme as useNextTheme } from 'next-themes';
import { Navbar, Text, Button, useTheme } from '@nextui-org/react';
import Link from 'next/link';

export default function Nav(props: any) {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <>
      <Navbar variant='sticky' shouldHideOnScroll>
        <Navbar.Brand>
          <Link href='/'>
            <Text b h4 color='inherit' hideIn='xs'>
              Pokedex
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content hideIn='xs'>
          <Text b h4 color='inherit' hideIn='xs'>
            Gotta fetch em all!
          </Text>
        </Navbar.Content>
        <Navbar.Content>
          <Button
            bordered
            color='gradient'
            auto
            onPress={(e) => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? 'Dark' : 'Light'}
          </Button>
        </Navbar.Content>
      </Navbar>
      {props.children}
    </>
  );
}
