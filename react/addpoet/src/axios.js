import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.sg24.com/'
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;