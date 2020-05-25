/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
  let theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      accent: 'white',
      background:'green',
      surface:'green'
    },
  };
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
  
  AppRegistry.registerComponent(appName, () => Main);

