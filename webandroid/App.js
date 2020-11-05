/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import App from './Base';
import configureStore from './src/store/configureStore';

const store = configureStore();
SplashScreen.preventAutoHideAsync()
const Root = () => (
    <Provider store={store}>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </Provider>
)

export default Root;