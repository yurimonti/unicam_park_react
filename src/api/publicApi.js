import { api } from './axiosInstance';

export const getParks = async()=>{
    let parks;
    await api.get('/prova/parks',{
        headers: {'Access-Control-Allow-Origin':'*'},
        responseType:'json'
    }).then(res=>{
        parks = res.data;
    }).catch(err=>{
        console.error(err);
    });
    return parks;
}
