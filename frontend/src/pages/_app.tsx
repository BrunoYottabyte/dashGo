import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from '../styles/theme'
import "../styles/global.scss";
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { MakeServer } from '../services/mirage';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';
import ThemeProvider from '../contexts/ThemeContext';
import { Toast } from '../components/Toast';
import { ToastProvider } from '../contexts/ToastContext';

// if (process.env.NODE_ENV === 'development') {
//   MakeServer();
// }

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
