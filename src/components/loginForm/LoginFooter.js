import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import './Login.css'

export default function LoginFooter (props) {
  function renderLoginButton () {
    if (!props.register)
      return (
        <Button
          id='login-button'
          variant='primary'
          type='submit'
          className='mb-3'
        >
          Login
        </Button>
      )
    else
      return (
        <Button
          id='login-button'
          variant='primary'
          type='submit'
          className='mb-3'
        >
          Registrati
        </Button>
      )
  }

  function renderRegButton () {
    if (!props.register)
      return (
        <div className='LoginFooter-RegButton'>
          <p style={{ color: 'white' }}>Non hai un account? </p>
          <Button type='button' variant='primary' onClick={props.onClick}>
            Registrati
          </Button>
        </div>
      )
    else
      return (
        <div className='LoginFooter-RegButton'>
          <p style={{ color: 'white' }}>Hai un account? </p>
          <Button type='button' variant='primary' onClick={props.onClick}>
            Login
          </Button>
        </div>
      )
  }

  return <div className='LoginFooter'>
      {renderLoginButton()}
      {renderRegButton()}
      </div>
}
