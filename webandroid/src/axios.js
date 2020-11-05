import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.173.1:3000/'
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;