'use client';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://main--aprils-team-ru237.apollographos.net/graphql',
  cache: new InMemoryCache(),
  ssrMode: true,
});

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      defaultTheme='system'
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider theme={darkTheme}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default Providers;
