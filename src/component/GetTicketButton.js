import { useEffect, useState } from 'react';
import { publicInstance, privateInstance } from '../api/axiosInstance';
import { Button, Modal, ToggleButton } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TimePicker from 'react-bootstrap-time-picker';
import Park from './Park';
import '../styles/Home.css';

const GetTicketButton = (props) => {
  const [show, setShow] = useState(false);
  const [parks, setParks] = useState([]);
  const [showStart, setShowStart] = useState(true);
  const [start, setStart] = useState('9:00:00');
  const [end, setEnd] = useState('9:30:00');
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (reload)
      getParks();
    return () => { setReload(false) }
  }, []);

  const postTicket = (id) => {
    let payload = { parkId: id, start: getStartDate(), end: getEndDate() };
    privateInstance.post('/api/ticket/create', payload,{
      headers:{'authorization':'Bearer '+localStorage.getItem('token')}
    })
      .then(res => {
        alert('Park reserved');
        console.log(res.status);
        navigate('../tickets');
      }).catch(err => { console.log(err) });
  }

  const getStartDate = () => {
    let startDate = new Date();
    if (!showStart) return startDate;
    let s = start.split(':');
    startDate.setHours(s[0]);
    startDate.setMinutes(s[1]);
    startDate.setSeconds(s[2]);
    startDate.setMilliseconds(0);
    return startDate;
  }

  const getEndDate = () => {
    let endDate = new Date();
    let s = end.split(':');
    endDate.setHours(s[0]);
    endDate.setMinutes(s[1]);
    endDate.setSeconds(s[2]);
    endDate.setMilliseconds(0);
    return endDate;
  }

  const getParks = () => {
    let startDate = getStartDate();
    let endDate = getEndDate();
    let payload = {
      start: startDate,
      end: endDate
    };
    publicInstance.post('/parks', payload)
      .then(res => {
        setParks(res.data);
      }).catch(err => { console.log(err) });
  }

  const renderButtons = () => {
    return parks.map(park => {
      return (<Park park={park} key={park.id}
        click={() => { postTicket(park.id) }} />)
    })
  }

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
      setShow(false);
    }}>
      <div className='start'>
        <ToggleButton /* className="mb-2" id="toggle-check" */
          type="checkbox" variant="outline-primary"
          checked={showStart}
          onClick={() => {
            setShowStart(!showStart);
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
        disabled={!localStorage.getItem('token')}
        onClick={() => {
          setShow(true);
        }}
      >Get a Ticket!</Button>
      {modalPark}
    </div>
  )
}
export default GetTicketButton;