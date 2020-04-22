import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.slodge24.com',
    timeout: 20000
});
instance.defaults.headers.common['authorization'] = 'authorization';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default instance;