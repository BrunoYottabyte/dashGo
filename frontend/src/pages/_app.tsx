import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from '../styles/theme'
import "../styles/global.css";
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { MakeServer } from '../services/mirage';
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';

// if (process.env.NODE_ENV === 'development') {
//   MakeServer();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>

  )
}

export default MyApp