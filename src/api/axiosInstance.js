import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from 'dayjs';

const baseURL = 'http://localhost:4000';


const privateApi =  axios.create({
    baseURL: baseURL,
    headers:{'Access-Control-Allow-Origin': '*'},
    responseType:'json'
})

const publicApi = axios.create({
    baseURL:baseURL,
    headers:{'Access-Control-Allow-Origin': '*'},
    responseType:'json'
})

//TODO:vedere perché axios interceptor non funziona quando il token expires

const refreshToken = async () => {
    let payload = {
        refreshToken: localStorage.getItem('refresh')
    }
    await publicApi.post('http://localhost:4000/auth/refresh', payload)
    .then(res => {
        let result = res.data;
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('refresh', result.refreshToken);
    }).catch(err => {
        console.log(err);
    })
}

privateApi.interceptors.request.use(async(request)=>{
    let decodedJwt = jwtDecode(localStorage.getItem('token'));
    if(dayjs.unix(decodedJwt.exp).diff(dayjs()) < 1){
        await refreshToken();
        request.headers['authorization'] = 'Bearer '+localStorage.getItem('token');
    }
    return request;
},(error)=>{
    console.log(error);
    return Promise.reject(error);
})

/* api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('token');
    if (token) {
        let decodedToken = jwtDecode(token);
        if (dayjs.unix(decodedToken.exp).diff(dayjs()) < 1) {
            await refreshToken();
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers["authorization"] = "Bearer " + localStorage.getItem('token');
        }
    }
    return config;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
}); */

/* api.interceptors.response.use(response => {
    console.log(response.status);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
}) */

function getPublicApi() {
    return publicApi;
}

function getPrivateApi(){
    return privateApi;
}

export {getPrivateApi,getPublicApi}