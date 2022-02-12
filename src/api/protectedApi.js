import {api} from './axiosInstance';

export const getTickets = async(isActive,start)=>{
    let tickets;
    let payload = {
        isActive:isActive,
        start:start
    };
    await api.post('/api/getTickets',payload,{
        headers: {'Access-Control-Allow-Origin':'*','authorization':'Bearer '+localStorage.getItem('token')},
        responseType:'json'
    }).then(res=>{
        tickets = res.data;
    }).catch(err=>{
        console.error(err);
    });
    return tickets;
}
