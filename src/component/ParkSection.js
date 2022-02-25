import { useState, useEffect } from 'react';
import { getApi } from '../api/axiosInstance.js';
import '../styles/ParkSection.css';
import Park from './Park';

const ParkSection = () => {
    const [parks, setParks] = useState([]);

    const getParks = async () => {
        await getApi().get('/prova/parks', {
            headers: { 'Access-Control-Allow-Origin': '*' },
            responseType: 'json'
        }).then(res => {
            setParks(res.data);
        }).catch(err => { console.log(err) });
    }

    useEffect(() => {
        getParks();
    }, [])

    const renderButtons = () => {
        return parks.map(park => {
            return (<Park park={park} key={park.id} />)
        })
    }

    return (
        <div className='ParkSection'>
            <h1>Park Section</h1>
            <hr />
            {renderButtons()}
            <button className='ParkSection-button' type='button' onClick={() => { alert(JSON.stringify(parks)) }} >click me!</button>
        </div>
    )
    /* const [parks, setParks] = useState([]);
    //const [reload,setReload] = useState(false);

    const getParks = async()=>{
        return await api.get('/prova/parks',{
            headers: {'Access-Control-Allow-Origin':'*'},
            responseType:'json'
        }).then(res=>{
            setParks(res.data);
        }).catch(err=>{
            console.error(err);
        });
    }

    useEffect(()=>{
        getParks();
    },[])

    const renderButtons = ()=>{
        return parks.map(park=>{
            return (<Park park={park} key={park.id} />)
        })
    }

    return(
        <div className="ParkSection">
            {renderButtons()}
        </div>
    ) */
}

export default ParkSection;