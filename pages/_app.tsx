import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/modal.module.css';

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider>
    <Component {...pageProps}/>
  </ChakraProvider>
}
