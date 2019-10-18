import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <h1>Hello</h1>
    </ThemeProvider>
  );
}

export default App;
