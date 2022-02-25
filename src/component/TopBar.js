import { useState, useEffect } from "react";
import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApi } from "../api/axiosInstance";
import '../App.css';

const TopBar = () => {
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('refresh')) setRefresh(true);
      else setRefresh(false);
    },[refresh])
  
    const logout = async () => {
      let payload = { refreshToken: localStorage.getItem("refresh") };
      await getApi()
        .post("/auth/logout", payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "authorization": "Bearer " + localStorage.getItem("token"),
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
                  if (refresh) logout();
                  navigate("./login");
                }}
              >
                {refresh ? "logout" : "login"}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };
  
  export default TopBar;