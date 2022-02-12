import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = 'http://localhost:4000';

const api = axios.create({
    baseURL: baseURL
});

const refreshToken = async () => {
    let payload = {
        refreshToken: localStorage.getItem('refresh')
    }
    await api.post('/auth/refresh', payload, {
        responseType: 'json'
    }).then(res => {
        let result = res.data;
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('refresh', result.refreshToken);
    }).catch(err => {
        console.log(err);
    })
}

api.interceptors.request.use(async (config) => {
    let currentDate = new Date();
    let token = localStorage.getItem('token');
    if (token) {
        let decodedToken = jwtDecode(localStorage.getItem('token'));
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            await refreshToken();
            config.headers["authorization"] = "Bearer " + localStorage.getItem('token');
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { api };