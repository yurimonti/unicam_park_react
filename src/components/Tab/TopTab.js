import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './TopTab.css'

const TopTab = props => {
  const isAuth = () => {
    if (!props.isAuth)
      return (
        <Nav.Link style={{ 
          color: '#FFF', 
          marginRight:"-2vw"
          }} href='/login'>
          Login
        </Nav.Link>
      )
    else
      return (
        <Nav.Link style={{ 
          color: '#FFF',
          marginRight:"-2vw"
          }} href='/'>
          Logout
        </Nav.Link>
      )
  }

  return (
    <div className='TopTab'>
      <Navbar
        style={{ maxHeight: '6vh', fontSize: 'large' }}
        bg='primary'
        variant='dark'
      >
        <Navbar.Brand href="https://www.unicam.it">
          <img
            src='/Logo_unicam.png'
            alt='Unicam Logo'
            style={{
              marginLeft:"1vw",
              height:'5vh',
              width:'5vh'
            }}
          />
        </Navbar.Brand>
        <Container>
          <Nav style={{
              marginLeft:"-5vw"
            }}>
            <Nav.Link href='parks'>Parks</Nav.Link>
            <Nav.Link href='/'>History</Nav.Link>
          </Nav>
          {isAuth()}
        </Container>
      </Navbar>
    </div>
  )
}

export default TopTab
