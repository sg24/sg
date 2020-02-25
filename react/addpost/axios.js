import axios from 'axios';
import global from '../../global/global';

const instance = axios.create({
    baseURL: global.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance;