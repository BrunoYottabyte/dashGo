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
import { Router } from 'next/router';
import "nprogress/nprogress.css";
import NProgress from "nprogress"
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  
 
  useEffect(() => {
      const handleRouteStart = () => NProgress.start();
      const handleRouteDone = () => NProgress.done();
  
      Router.events.on("routeChangeStart", handleRouteStart);
      Router.events.on("routeChangeComplete", handleRouteDone);
      Router.events.on("routeChangeError", handleRouteDone);
  
      return () => {
        // Make sure to remove the event handler on unmount!
        Router.events.off("routeChangeStart", handleRouteStart);
        Router.events.off("routeChangeComplete", handleRouteDone);
        Router.events.off("routeChangeError", handleRouteDone);
      };
    }, []);


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
