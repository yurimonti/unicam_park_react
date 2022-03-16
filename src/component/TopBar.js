import { Navbar, Button, Container, Nav } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
import { privateInstance } from "../api/axiosInstance";
import { useAuthContext,useAuthUpdateContext } from "../helpers/AuthProvider";
import '../App.css';

const TopBar = () => {
/*     const [isLogged, setIsLogged] = useState(false); */
    const isAuth = useAuthContext();
    const setIsAuth = useAuthUpdateContext();
    const navigate = useNavigate();

/*     useEffect(()=>{
      if(localStorage.getItem('refresh')) setIsAuth(true);
      else setIsAuth(false);
    },[isAuth,setIsAuth]) */
  
    const logout = () => {
      let payload = { refreshToken: localStorage.getItem("refresh") };
      privateInstance.post("/auth/logout", payload,{
        headers:{'authorization':'Bearer '+localStorage.getItem('token')}
      })
        .then((res) => {
          console.log(res.status);
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          setIsAuth();
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
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/parks">Parks</Nav.Link>
                <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
              </Nav>
              <Button
                className="justify-content-end"
                variant="primary"
                onClick={() => {
                  if (isAuth) {
                    logout();
                    setIsAuth();
                  };
                  navigate("./login");
                }}
              >
                {isAuth ? "logout" : "login"}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };
  
  export default TopBar;