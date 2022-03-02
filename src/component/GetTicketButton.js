import { useEffect, useState } from 'react';
import {getApi} from '../api/axiosInstance';
import { Button, Modal, Card, ToggleButton } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import Park from './Park';
import '../styles/Home.css';

const GetTicketButton = () => {
  const [show, setShow] = useState(false);
  const [parks, setParks] = useState([]);
  const [timeNow, setTimeNow] = useState('');
  const [start, setStart] = useState(true);
  const [timeEnd, setTimeEnd] = useState('9:30:00');
  const [timeStart, setTimeStart] = useState('9:00:00');


  useEffect(()=>{
    getParks();
  },[]);

  const getYMD = (now) => {
    let space = ' ';
    let date = now.getFullYear() + space + now.getMonth() + space + now.getDay();
    return date;
  }

  const getHMS = (now) => {
    let time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return time;
  }

  const getNow = () => {
    let now = new Date();
    let time = getHMS(now);
    return time;
  }


  const getParks = async () => {
    let now = new Date();
    let y = getYMD(now);
    let endDate = y+' '+timeEnd;
    let startDate = y+' ';
    if(start) startDate += timeStart;
    else startDate += timeNow;
    let payload ={
      start:startDate,
      end: endDate
    }
    await getApi().post('/parks',payload, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      responseType: 'json'
    }).then(res => {
      setParks(res.data);
    }).catch(err => { console.log(err) });
  }
  
  const renderButtons = () => {
    return parks.map(park => {
        return (<Park park={park} key={park.id} />)
    })
  }

  const getTime = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    let now = new Date();
    let date = getYMD(now);
    return date + ' ' + result;
  }

  const getTimeStart = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    setTimeStart(result);
    alert(result);
  }

  const getTimeEnd = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    setTimeEnd(result);
    alert(result);
  }



  const modalPark = <Modal show={show} fullscreen={true} scrollable={true} onHide={() => setShow(false)}>
    <Modal.Header closeButton={() => {
      setShow(false)
    }}>
      <div className='start'>
        <ToggleButton /* className="mb-2" id="toggle-check" */
          type="checkbox" variant="outline-primary"
          checked={start}
          onClick={() => {
            setStart(!start);
            setTimeNow(getNow());
          }}
        >
          {!start ? 'select start' : 'from now'}
        </ToggleButton>
        {start ?
          <TimePicker start="9:00" end="17:30"
            step={30} format={24} value={timeStart} onChange={getTimeStart} className='TimePicker' />
          : ''
        }
      </div>
      <div className='end'>
        <p>end</p>
        <TimePicker start="9:30" end="18:00"
          step={30} format={24} value={timeEnd} onChange={getTimeEnd} className='TimePicker' />
      </div>
      <div className='filterButton'>
        <Button type='button' onClick={() => {
          getParks();
        }} >filter</Button>
      </div>

    </Modal.Header>
    <Modal.Body className="m-auto">
      {renderButtons()}
    </Modal.Body>
  </Modal>

  return (
    <div className='GetTicketButton'>
      <Button
        type='button'
        onClick={() => {
          setShow(true);
        }}
      >Get a Ticket!</Button>
      {modalPark}
    </div>
  )
}
export default GetTicketButton;