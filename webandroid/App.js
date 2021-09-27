/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens';

import Root from './Root';
import configureStore from './src/store/configureStore';
import { ThemeProvider } from "react-native-stylex";

enableScreens();

const theme = {
  palette: {
    color: "#333",
    backgroundColor: "#fff",
    activeUri: {
      color: '#437da3'
    }
  },
  utils: {
    fade(color, value) {
      /*...*/
    }
  }
}
const store = configureStore();
SplashScreen.preventAutoHideAsync()
const app = () => (
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <SafeAreaProvider>
                <ThemeProvider value={theme}>
                  <Root />
              </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
    </Provider>
)

export default app;