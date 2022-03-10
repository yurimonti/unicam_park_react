import { useState, useEffect } from "react";
import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { privateInstance } from "../api/axiosInstance";
import '../App.css';

const TopBar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('refresh')) setIsLogged(true);
      else setIsLogged(false);
    },[isLogged])
  
    const logout = () => {
      let payload = { refreshToken: localStorage.getItem("refresh") };
      privateInstance.post("/auth/logout", payload)
        .then((res) => {
          console.log(res.status);
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
        })
        .catch((err) => {
          console.error(err.status);
        });
    };
  
    return (
      <div className="TopBar">
        <Navbar bg="primary" variant="dark" expand="md" fixed="top">
          <Container>
            <Navbar.Brand href="https://www.unicam.it/">
              <img
                alt=""
                src="../logo_unicam.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Unicam Park
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/parks">Parks</Nav.Link>
                <Nav.Link href="/tickets">Tickets</Nav.Link>
              </Nav>
              <Button
                className="justify-content-end"
                variant="primary"
                onClick={() => {
                  if (isLogged) logout();
                  navigate("./login");
                }}
              >
                {isLogged ? "logout" : "login"}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };
  
  export default TopBar;