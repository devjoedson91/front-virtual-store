import React from 'react';
import { AppProps } from 'next/app';
import '../../styles/main.css';
import '../../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from '../hooks/useCart';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <CartProvider>  
        <Component {...pageProps} />
        <Footer />
        <ToastContainer autoClose={3000} />
      </CartProvider>
    </React.Fragment>
  )
}

export default MyApp
