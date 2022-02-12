import {useState,useEffect} from "react";
import './LoginForm.css'
import {loginUser,registerUser,logoutUser} from './api/LoginApi'
import {Form,Button} from 'react-bootstrap'

const LoginForm = ()=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [show,setShow] = useState(false);

    useEffect(()=>{
        return ()=>{
            setUsername('');
            setPassword('');
        }
    },[])

    return(
        <div className="LoginForm">
            <h2>CREATE AN ACCOUNT OR LOGIN IF YOU ALREADY HAVE GOT ONE</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={show ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Show Password" onClick={()=>{setShow(!show)}} />
                </Form.Group>
            </Form>
            <div className="LoginForm-buttons">
                <Button variant="primary" type="button" onClick={()=>{ loginUser(username,password)}}>
                    Login
                </Button>
                <Button variant="primary" type="button" onClick={()=>{ registerUser(username,password)}}>
                    Register
                </Button>
            </div>
        </div>
        
    )

    /* return(
        <div className="Form">
            <h2>CREATE AN ACCOUNT OR LOGIN IF YOU ALREADY HAVE GOT ONE</h2>
            <form>
                <input 
                    type='email'
                    placeholder="insert email.."
                    value={username}
                    onChange={(e)=>{ setUsername(e.target.value)}}
                />
                <div className="Form-password">
                    <input id="bottone" 
                    type={show ? 'text' : 'password'}
                    placeholder="insert password..."
                    value={password}
                    onChange={(e)=>{ setPassword(e.target.value)}}
                    />
                    <input type="checkbox" onClick={()=>{setShow(!show)}} value='show' />
                </div>
                <div className="Form-buttons">
                    <button type="button" onClick={()=>{apiLogin.loginUser(username,password)}}>LOGIN</button>
                    <button type="button" onClick={()=>{apiLogin.registerUser(username,password)}}> REGISTER</button>
                </div>
            </form>   
        </div>
    ) */
}

export default LoginForm;