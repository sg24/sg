import axios from 'axios';
// import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

const instance = axios.create({
    baseURL: Constants.manifest.extra.BASE_URL
});
// instance.defaults.headers.common['authorization'] = 'authorization';
instance.interceptors.request.use(async function(config) {
    // const origin = Platform.OS === 'web' ? origin : config.baseURL;
    // const allowedOrigins = [config.baseURL];
    const token = await AsyncStorage.getItem('token');
    // if (allowedOrigins.includes(origin)) {
    config.headers.authorization = token;
    // }
    return config;
}, function (error) {
    return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.message.split(' ').pop() === '401') {
        AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  });

export default instance;