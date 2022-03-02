import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "../styles/ParkSection.css";
import { getApi } from '../api/axiosInstance.js';
import Ticket from "./Ticket";


const Park = (props) => {
  const [park, setPark] = useState(props.park);
  const [info, setInfo] = useState({});
  const [location, setLocation] = useState({});
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getInfo = async () => {
    await getApi().post('/park/info', { parkId: park.id }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      responseType: 'json'
    }).then(res => {
      setInfo(res.data);
      setLocation(res.data.location);
    }).catch(err => { console.log(err) });
  }

  const getNext = async () => {
    await getApi().post('/park/next', { parkId: park.id }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      responseType: 'json'
    }).then(res => {
      setTickets(res.data);
    }).catch(err => { console.log(err) });
  }

  useEffect(() => {
    setPark(park);
    getInfo();
    getNext();
  }, [park]);

  //TODO:completare il metodo
  const renderNextTickets = () => {
    if(tickets[0]) return(<p>tickets</p>);
    return tickets.map(t => {
      return (<Ticket ticket={t} key={t.id} />);
    })
  }

  const MyVerticallyCenteredModal = 
      <Modal
        onHide={() => setShowModal(false)}
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={() => {
          setShowModal(false)
        }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* TODO:inserire informazione location */}
            {park.info + park.codeNumber + " " + location.description}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{park.isEmpty ? "next:" + info.next : "end:" + info.end + "next:" + info.next}</h4>
          {/* TODO: inserire la lista dei tickets */}
          {renderNextTickets()}
        </Modal.Body>
      </Modal>

  return (
    <div className="Park">
      <Card
        bg={park.isEmpty ? 'success' : 'danger'}
        text='light'
        style={{ width: '100px', height: '100px' /* minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' */ }}
        className="float-left d-flex"
        onClick={() => { setShowModal(true) }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: 20 }}> {park.info + park.codeNumber} </Card.Title>
          <Card.Text style={{ fontSize: 12 }}>
            {park.isEmpty ? 'available' : 'reserved'}
          </Card.Text>
        </Card.Body>
      </Card>
      {MyVerticallyCenteredModal}
    </div>
  );
};
export default Park;