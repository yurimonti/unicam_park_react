import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from 'dayjs';

const baseURL = 'http://localhost:4000';


axios.defaults.baseURL = baseURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const publicInstance = axios.create();

const privateInstance = axios.create({
    headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
});

const refreshToken = async() => {
    let payload = {
        refreshToken: localStorage.getItem('refresh')
    }
    await publicInstance.post('/auth/refresh', payload)
        .then(res => {
            let result = res.data;
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('refresh', result.refreshToken);
        }).catch(err => {
            console.log(err);
        })
}

privateInstance.interceptors.request.use(async (request) => {
    let decodedJwt = jwtDecode(localStorage.getItem('token'));
    if (dayjs.unix(decodedJwt.exp).diff(dayjs()) < 1) {
        await refreshToken();/* .then(res => {
            let result = res.data;
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('refresh', result.refreshToken);
        }).catch(err => {
            console.log(err);
        }) */
        request.headers['authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return request;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

export {publicInstance,privateInstance}
