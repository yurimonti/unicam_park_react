import React, { useState, useEffect } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import './Login.css'
import LoginFooter from './LoginFooter'

export default function Login () {
  const [register, setRegister] = useState(false)

  const changeReg = () => {
    if (register) setRegister(false)
    else setRegister(true)
  }

  const UsernameInput = () => {
    return (
      <FloatingLabel
        controlId='floatingUsername'
        label='Username'
        className='mb-3'
        style={{ color: 'black' }}
      >
        <Form.Control type='input' placeholder='Username' />
      </FloatingLabel>
    );
  }

  const renderInputUsername = ()=>{
    if(register)return(
      <UsernameInput />
    )
  }

  return (
    <div className='Login'>
      <div className='Login-Form'>
        <Form>
          <FloatingLabel
            controlId='floatingEmail'
            label='Email address'
            className='mb-3'
            style={{ color: 'black' }}
          >
            <Form.Control type='email' placeholder='Email' />
          </FloatingLabel>
          {renderInputUsername()}
          <FloatingLabel
            controlId='floatingPassword'
            label='Password'
            className='mb-3'
            style={{ color: 'black' }}
          >
            <Form.Control type='password' placeholder='Password' />
          </FloatingLabel>
          <LoginFooter register={register} onClick={changeReg} />
        </Form>
      </div>
    </div>
  )
}
