import Link from 'next/link';
import { MoonIcon, SunIcon, HomeIcon } from '@primer/octicons-react';

interface DarkMode {
  isDark: boolean;

  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isDark, setIsDark }: DarkMode) => {
  return (
    <nav className='fixed top-0 flex w-full flex-row place-content-between	place-items-center	bg-secondary-200/10 py-4 px-5 backdrop-blur-md transition-all hover:text-secondary-700 dark:bg-secondary-800/10	'>
      <header>
        <Link
          href='/'
          className=' text-secondary-800 transition-all	hover:text-primary-600 dark:text-secondary-200 hover:dark:text-tertiary-100	'
        >
          <HomeIcon aria-label='Home' />
        </Link>
      </header>
      <main>
        <h1 className='text-lg font-bold	text-secondary-800  transition-all dark:text-secondary-200	'>
          Gotta fetch &apos;em all!
        </h1>
      </main>
      <footer>
        <button
          onClick={() => setIsDark(!isDark)}
          className='min-w-1 min-h-1  p-2  text-secondary-800 transition-all hover:text-primary-600 dark:text-secondary-200 hover:dark:text-tertiary-100	'
        >
          {isDark ? (
            <MoonIcon aria-label='Dark mode' />
          ) : (
            <SunIcon aria-label='Light mode' />
          )}
        </button>
      </footer>
    </nav>
  );
};

export default Navbar;
