import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

import "../styles/global.scss";
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';
import ThemeProvider from '../contexts/ThemeContext';
import { ToastProvider } from '../contexts/ToastContext';
import { FetchProvider } from '../contexts/FetchContext';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <FetchProvider>

            <QueryClientProvider client={queryClient}>
              <ChakraProvider>
                <SidebarDrawerProvider>
                  <Component {...pageProps} />
                </SidebarDrawerProvider>
              </ChakraProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </FetchProvider>

        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default MyApp
