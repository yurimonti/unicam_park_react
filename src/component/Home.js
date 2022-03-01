import { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import GetTicketButton from './GetTicketButton';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  var park = {
    id: 0, codeNumber: 1, info: 'A', isEmpty: false
  };
  var location = { id: 0, info: 'polo informatica' };

  const MyVerticallyCenteredModal = () => {
    return (
      <Modal
        onHide={() => setShowModal(false)}
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={() => {
          setShowModal(false)
        }} >
          <Modal.Title id="contained-modal-title-vcenter">
            {park.info + park.codeNumber + " " + location.info}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{park.isEmpty ? 'next: 17' : 'end: 15  next : 17'}</h4>
          <p>
            lista delle prenotazioni orarie per quel parcheggio
          </p>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={()=>{
            setShowModal(false)
          }}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }



  return (
    <div className="Home">
      <div className='Home-Title'>
        <h1>Home</h1>
        <hr />
      </div>
      <h4>{location.info}</h4>
      {/* <Button type='button' style={{border:0}} className='p-0 m-0 mb-2'>
        <Card
          bg='success'
          text='light'
          style={{ minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' }}
          className="float-left d-flex"
        >
          <Card.Header>A1</Card.Header>
          <Card.Body>
            <Card.Title> Libero </Card.Title>
            <Card.Text>
              fino alla fine
            </Card.Text>
          </Card.Body>
        </Card>
      </Button>
      <Button type='button' style={{border:0}} className='p-0 m-0 mb-2'>
      <Card
        bg='danger'
        text='light'
        style={{ minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' }}
        className="mb-2 float-left d-flex"
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>
            Ciao Mondo
          </Card.Text>
        </Card.Body>
      </Card>
      </Button> */}
      <div className='Home-button' style={{marginBottom:'1em'}}>
        <GetTicketButton />
      </div>
      <div className='Home-Cards' style={{ display: 'flex' }}>
        <Card
          bg='success'
          text='light'
          style={{ width: '100px', height: '100px' /* minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' */ }}
          className="float-left d-flex"
          onClick={() => { setShowModal(true) }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: 20 }}> parcheggio </Card.Title>
            <Card.Text style={{ fontSize: 12 }}>
              ciao
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          bg='success'
          text='light'
          style={{ width: '100px', height: '100px' /* minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' */ }}
          className="float-left d-flex"
          onClick={() => { setShowModal(true) }}
        >
          <Card.Body>
            <Card.Title style={{ fontSize: 20 }}> parcheggio </Card.Title>
            <Card.Text style={{ fontSize: 12 }}>
              ciao
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      {MyVerticallyCenteredModal()}
    </div>
  );
};

export default Home;
