import './App.css';
import * as React from 'react';
import AppContainer from './components/AppContainer';

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <ChakraProvider>
            <WeatherProvider>
              <AppContainer />
            </WeatherProvider>
        </ChakraProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
