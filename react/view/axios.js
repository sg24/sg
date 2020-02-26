import axios from 'axios';
import global from '../../global/global';

const instance = axios.create({
    baseURL: global.url
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;