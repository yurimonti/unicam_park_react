import {api} from './axiosInstance';

async function registerUser(email,password){
    let payload ={
        email:email,
        password:password,
        username:email
    }
    await api.post('/auth/registration',payload,{
        responseType:'json'
    }).then(res =>{
        console.log(res.data);
    }).catch(err=>{
        console.error(err);
    })
}

async function loginUser(email,password){
    let payload ={
        username:email,
        password:password
    }
    await api.post('/auth/login',payload,{
        headers: { 'Access-Control-Allow-Origin': '*' },
        responseType:'json'
    }).then(res =>{
        let result = res.data;
        localStorage.setItem('token',result.accessToken);
        localStorage.setItem('refresh',result.refreshToken);
        console.log('authentication completed');
    }).catch(err=>{
        console.log(err);
    })
}

async function logoutUser(){
    let payload = {refreshToken:localStorage.getItem('refresh')};
    await api.post('/auth/logout',payload,{
        headers: {'Access-Control-Allow-Origin': '*','authorization':'Bearer '+localStorage.getItem('token')},
        responseType:'json'
    }).then(res=>{
        console.log(res);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    }).catch(err=>{
        console.error(err);
    });
}

export {registerUser, loginUser,logoutUser};