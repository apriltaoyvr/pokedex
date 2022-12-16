'use client';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useServerInsertedHTML } from 'next/navigation';
import { CssBaseline } from '@nextui-org/react';
import StyledComponentsRegistry from './registry';
import GlobalStyle from './GlobalStyle.styled';

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
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
};
