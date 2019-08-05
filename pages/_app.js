import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FontLight';
    src: url('./static/fonts/HKGrotesk-Light.ttf') format('opentype');
  }
  @font-face {
    font-family: 'FontRegular';
    src: url('./static/fonts/HKGrotesk-Regular.ttf') format('opentype');
  }
  body {
    font-family: FontRegular;
    margin: 0;
  }

  a {
    color: white;
    text-decoration: none;
    font-family: fontRegular;
    font-weight: 400;
    transition: 0.3s;

    &:hover {
      color: #65d2e9;
    }
  }
`

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
      <GlobalStyle />
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
      </Fragment>
    );
  }
}

export default MyApp;