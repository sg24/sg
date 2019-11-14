import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3002/'
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;