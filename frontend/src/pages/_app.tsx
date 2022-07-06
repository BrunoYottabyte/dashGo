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


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AuthProvider>
      <ThemeProvider>
       <ToastProvider>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
              <SidebarDrawerProvider>
                <Component {...pageProps} />
              </SidebarDrawerProvider>
            </ChakraProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
       </ToastProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default MyApp
