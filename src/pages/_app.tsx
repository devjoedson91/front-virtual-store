import React from 'react';
import { AppProps } from 'next/app';
import '../../styles/main.css';
import '../../styles/globals.scss';
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from '../hooks/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <CartProvider>
        
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </React.Fragment>
  )
}

export default MyApp
