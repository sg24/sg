/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/configureStore';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
