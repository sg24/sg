import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.protocol + '//' + window.location.host
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;