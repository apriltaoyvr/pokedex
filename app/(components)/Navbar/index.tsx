import Link from 'next/link';
import { MoonIcon, SunIcon, HomeIcon } from '@primer/octicons-react';

interface DarkMode {
  isDark: boolean;

  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isDark, setIsDark }: DarkMode) => {
  return (
    <nav className='sticky flex min-h-[96px] w-full flex-row	place-content-between	place-items-center bg-secondary-200/10 px-5 backdrop-blur-md transition-all hover:text-secondary-700 dark:bg-secondary-800/10	'>
      <header>
        <Link
          href='/'
          className='text-lg font-semibold text-secondary-800 transition-all	hover:text-secondary-700 dark:text-secondary-200 hover:dark:text-secondary-100	'
        >
          <HomeIcon size='medium' />
        </Link>
      </header>
      <main>
        <h1 className='text-2xl font-bold	text-secondary-800  transition-all dark:text-secondary-200	'>
          Gotta fetch &apos;em all!
        </h1>
      </main>
      <footer>
        <button
          onClick={() => setIsDark(!isDark)}
          className='min-w-1 min-h-1  p-2  text-secondary-800 transition-all hover:text-secondary-700 dark:text-secondary-200 hover:dark:text-secondary-100	'
        >
          {isDark ? (
            <MoonIcon size='medium' aria-label='Dark mode' />
          ) : (
            <SunIcon size='medium' aria-label='Light mode' />
          )}
        </button>
      </footer>
    </nav>
  );
};

export default Navbar;
