import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3002/'
});

instance.interceptors.request.use((res) => {
    console.log(res);
    return res;
}, (err) => {
    console.log(err);
    return Promise.reject()
});


export default instance;