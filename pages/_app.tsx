import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';
import { lightTheme } from '../themes/'
import Spinner from "../core/components/Spinner"
import { ProviderSpinner } from '../core/context/providerSpinner';
import { Sidebar } from '../core/components/Sidebar';


function MyApp({ Component, pageProps }: AppProps) {


  return (
    <NextUIProvider theme={lightTheme}>
      <ProviderSpinner>
        <Spinner />
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
        <Toaster position='top-left' />
      </ProviderSpinner>
    </NextUIProvider>
  )
}

export default MyApp
