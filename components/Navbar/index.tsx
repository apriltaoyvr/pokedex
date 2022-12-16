import Link from 'next/link';
import { useTheme as useNextTheme } from 'next-themes';
import { Navbar, Text, Button, useTheme } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

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
            onPress={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <FontAwesomeIcon
              icon={isDark ? faMoon : faSun}
              size='lg'
              fixedWidth
              style={{
                minHeight: '1rem',
                minWidth: '1rem',
              }}
            />
          </Button>
        </Navbar.Content>
      </Navbar>
      {props.children}
    </>
  );
}
