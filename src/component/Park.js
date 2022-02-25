import { useState, useEffect } from "react";
import { Button,Card,Modal } from "react-bootstrap";
import "../styles/ParkSection.css";

const Park = (props) => {
  const [park, setPark] = useState(props.park);
  const [next,setNext] = useState('');
  const [showModal,setShowModal] = useState(false);

  useEffect(() => {
    setPark(park);
  }, [park]);

  const MyVerticallyCenteredModal = ()=>{
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            setShowModal(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /* const changePark = (event)=>{
        setPark(()=>{
            props.park.isEmpty = !park.isEmpty;
            return props.park;
        });
        event.preventDefault();
    } */

  return (
    <div className="Park">
        <Card
          bg={park.isEmpty ?'success':'danger'}
          text='light'
          style={{ width:'100px', height:'100px' /* minWidth: '20vw', minHeight: '20vh', maxWidth: '30vw', maxHeight: '30vh' */ }}
          className="float-left d-flex"
          onClick={()=>{setShowModal(true)}}
        >
          <Card.Body>
            <Card.Title style={{fontSize:20}}> {park.info + park.codeNumber} </Card.Title>
            <Card.Text style={{fontSize:12}}>
              {park.isEmpty ? 'available to '+next:'avilable from '+next}
            </Card.Text>
          </Card.Body>
        </Card>
        {MyVerticallyCenteredModal()}
      {/* <Button variant={park.isEmpty ? "success" : "danger"}>
        {park.info + park.codeNumber}
      </Button> */}
    </div>
  );
};
export default Park;