import { useEffect, useState } from 'react';
import { getPublicApi } from '../api/axiosInstance';
import { Button, Modal, Card, ToggleButton } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import Park from './Park';
import '../styles/Home.css';

const GetTicketButton = () => {
  const [show, setShow] = useState(false);
  const [parks, setParks] = useState([]);
  const [timeNow, setTimeNow] = useState('');
  const [showStart, setShowStart] = useState(true);
  const [start, setStart] = useState('9:00:00');
  const [end, setEnd] = useState('9:30:00');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload)
      getParks();
    return () => { setReload(false) }
  }, []);

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

  //metodo prova
  /* const provaData = async () => {
    let s = start.split(':');
    let now = new Date();
    now.setHours(s[0]);
    now.setMinutes(s[1]);
    now.setSeconds(s[2]);
    now.setMilliseconds(0);
    let payload = { date: now }
    await getApi().post('/date', payload, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      responseType: 'json'
    }).then(res => {
      setDate(res.data);
      console.log(res.data);
    }).catch(err => { console.log(err) });
  } */


  const getParks = async () => {
    let now = new Date();
    let startDate = now;
    let e = end.split(':');
    now.setHours(e[0]);
    now.setMinutes(e[1]);
    now.setSeconds(e[2]);
    now.setMilliseconds(0);
    let endDate = now;
    if (showStart) {
      let s = start.split(':');
      now.setHours(s[0]);
      now.setMinutes(s[1]);
      now.setSeconds(s[2]);
      now.setMilliseconds(0);
      startDate = now;
    }
    let payload = {
      start: startDate,
      end: endDate
    }
    await getPublicApi().post('/parks', payload).then(res => {
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

  /* const getTimeStart = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    setStart(result);
    alert(start);
  } */

  const getTimeStart = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    setStart(result);
  }


  const getTimeEnd = (t) => {
    t = t / 3600;
    let f = Math.floor(t);
    let result = t + ':00:00';
    if (f < t && f > t - 1) result = f + ':30:00';
    setEnd(result);
  }



  const modalPark = <Modal show={show} fullscreen={true} scrollable={true} onHide={() => setShow(false)}>
    <Modal.Header closeButton={() => {
      setShow(false)
    }}>
      <div className='start'>
        <ToggleButton /* className="mb-2" id="toggle-check" */
          type="checkbox" variant="outline-primary"
          checked={showStart}
          onClick={() => {
            setShowStart(!showStart);
            setTimeNow(getNow());
          }}
        >
          {!showStart ? 'select start' : 'from now'}
        </ToggleButton>
        {showStart ?
          <TimePicker start="9:00" end="17:30"
            step={30} format={24} onChange={getTimeStart} value={start} className='TimePicker' />
          : ''
        }
      </div>
      <div className='end'>
        <p>end</p>
        <TimePicker start="9:30" end="18:00"
          step={30} format={24} value={end} onChange={getTimeEnd} className='TimePicker' />
      </div>
      <div className='filterButton'>
        <Button type='button' /* onClick={async() => {await provaData()}} */
          onClick={() => { getParks(); setReload(true); }}
        >filter</Button>
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