import '../styles/globals.css'
import '../components/ImageCarousel/styles.css';
import '../components/ZoomCursor/styles.css';
import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../src/theme';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles!.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />      
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
  )
}

export default MyApp
