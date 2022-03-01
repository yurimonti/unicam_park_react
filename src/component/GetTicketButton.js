import { useState, useStete } from 'react';
import { Button,Modal,Card } from 'react-bootstrap';

const GetTicketButton = () => {
    const [show, setShow] = useState(false);

    const modalPark = <Modal show={show} fullscreen={true} scrollable={true} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Modal</Modal.Title>
    </Modal.Header>
    <Modal.Body className="justify-content-center">
    <Card
          bg='success'
          text='light'
          style={{ width: '100px', height: '100px' /* minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' */ }}
          className="float-left"
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
          className="float-left"
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
          className="float-left"
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
          className="float-left"
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
          className="float-left"
        >
          <Card.Body>
            <Card.Title style={{ fontSize: 20 }}> parcheggio </Card.Title>
            <Card.Text style={{ fontSize: 12 }}>
              ciao
            </Card.Text>
          </Card.Body>
        </Card>
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