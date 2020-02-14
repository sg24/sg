import axios from 'axios';


const instance = axios.create({
    baseURL: typeof window !== `undefined` ? window.location.protocol + '//' + window.location.host : null
});
instance.defaults.headers.common['authorization'] = 'authorization';

export default instance;