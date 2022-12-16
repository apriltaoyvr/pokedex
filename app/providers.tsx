'use client';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useServerInsertedHTML } from 'next/navigation';
import { CssBaseline } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });

  return (
      <NextThemesProvider
        defaultTheme='system'
        attribute='class'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </NextThemesProvider>
  );
};

export default Providers;