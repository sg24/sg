import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://slodge24.com/'
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;