import { useState, useEffect } from 'react';
import { publicInstance } from '../api/axiosInstance.js';
import '../styles/ParkSection.css';
import Park from './Park';
import GetTicketButton from './GetTicketButton';


const ParkSection = () => {
    const [parks, setParks] = useState([]);

    const getParks = () => {
        publicInstance.get('/parks')
        .then(res => {
            setParks(res.data);
            console.log(res.status);
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
            <div className='ParkSection-button' style={{ marginBottom: '1em' }}>
                <GetTicketButton />
            </div>
            <hr />
            {renderButtons()}
        </div>
    )
}

export default ParkSection;