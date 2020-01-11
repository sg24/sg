import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.origin
});
instance.defaults.headers.common['authorization'] = 'authorization';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default instance;