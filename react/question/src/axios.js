import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.origin
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;