import { useState, useEffect } from 'react';
import GetTicketButton from './GetTicketButton';
import ParkProva from './ParkProva';
import { getPublicApi,getPrivateApi } from '../api/axiosInstance';

const Home = () => {
  const [parks, setParks] = useState([]);

  const getParks = async () => {
    await getPublicApi().get('/parks', {
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
      return (
        <ParkProva park={park} key={park.id} />
      )
    })
  }

  const postTicket = async (id) => {
    let payload = { parkId: id, start: new Date(), end: new Date('2022-03-08 18:12:00') };
    await getPrivateApi().post('/api/ticket/create', payload,{
      headers:{'authorization':'Bearer '+localStorage.getItem('token')}
    })
      .then(res => {
        alert(res.data.park_id);
        console.log(res.status);
      }).catch(err => { console.log(err) });
  }

  const renderButtonsClick = () => {
    return parks.map(park => {
      return (
        <ParkProva park={park} key={park.id} click={() => { postTicket(park.id) }} />
      )
    })
  }

  return (
    <div className='Home'>
      <h1>Park Section</h1>
      <hr />
      <div className='Home-button' style={{ marginBottom: '1em' }}>
        <GetTicketButton />
      </div>
      <hr />
      {renderButtons()}
      <hr />
      <h1>Park Clickable</h1>
      <hr />
      {renderButtonsClick()}
    </div>
  )
}

export default Home;
