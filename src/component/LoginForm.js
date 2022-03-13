import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance.js";
import "../styles/LoginForm.css";
import { useAuthContext,useAuthUpdateContext } from "../helpers/AuthProvider.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const isAuth = useAuthContext();
  const setIsAuth = useAuthUpdateContext();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

  const loginUser = (username, password) => {
    let payload = {
      username: username,
      password: password,
      isAdmin:isAdmin
    };
    publicInstance.post("/auth/login", payload)
      .then((res) => {
        let result = res.data;
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("refresh", result.refreshToken);
        setIsAuth();
        console.log("authentication completed");
        if(isAdmin) navigate("../");
        else navigate('../parks');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser = (email, password) => {
    let payload = {
      email: email,
      password: password,
      username: email
    };
    publicInstance.post("/auth/registration", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /* const logoutUser = async () => {
    let payload = { refreshToken: localStorage.getItem("refresh") };
    await getApi()
      .post("/auth/logout", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: "Bearer " + localStorage.getItem("token")
        },
        responseType: "json"
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
      })
      .catch((err) => {
        console.error(err);
      });
  }; */

  return (
    <div className="LoginForm">
      <h2>CREATE AN ACCOUNT OR LOGIN IF YOU ALREADY HAVE GOT ONE</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show Password"
            id="showPassword"
            onClick={() => {
              setShow(!show);
            }}
          />
          <Form.Check
            type="checkbox"
            label="you are admin?"
            id='isAdmin'
            onClick={() => {
              setIsAdmin(!isAdmin);
            }}
          />
        </Form.Group>
      </Form>
      <div className="LoginForm-buttons">
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            loginUser(username, password);
            // navigate('../parks');
          }}
        >
          Login
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            registerUser(username, password);
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
