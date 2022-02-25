import { useState, useEffect } from 'react';
import { Card,Button } from 'react-bootstrap';

const Home = () => {



  return (
    <div className="Home">
      <h1>Home</h1>
      <Button type='button' style={{border:0}} className='p-0 m-0 mb-2'>
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
      </Button>
    </div>
  );
};

export default Home;
