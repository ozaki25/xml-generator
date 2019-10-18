import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import Top from './components/Top';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Top />
    </ThemeProvider>
  );
}

export default App;
