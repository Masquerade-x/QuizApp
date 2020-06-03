import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaView} from 'react-native';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <>
      <AppNavigator />
      <FlashMessage
        position="top"
        floating
        style={{
          backgroundColor: 'orange',
          color: 'white', // text color
        }}
      />
    </>
  );
}
