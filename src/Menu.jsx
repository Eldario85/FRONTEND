import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./Menu.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FiHome } from "react-icons/fi";
import { FaTshirt } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import CartElements from "./componentes/CartContent/CartElements";
function Menu() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t !== token) {
      setToken(t);
    }
  });

  function logout() {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  //const token = sessionStorage.getItem("token");
  if (token !== "" && token !== null) {
    var decoded = jwt_decode(token);
    var tokenDecoded = jwt_decode(sessionStorage.getItem("token"));
    const rol = tokenDecoded.rol_id;

    return (
      <>
        <Navbar className="navbar bg-primary" data-bs-theme="dark">
          <Container className="barra-menu">
            <Navbar.Brand href="/">
              <Image
                className="circular"
                src="icono messi.ico"
                roundedCircle
                width="50"
                height="50"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  Home <FiHome />
                </Nav.Link>
                <Nav.Link href="/camisetas">
                  Camisetas <FaTshirt />
                </Nav.Link>
                <Nav.Link href="/pedido">Pedidos</Nav.Link>
                {rol === 1 ? (
                  <Nav.Link href="/clientes">Clientes</Nav.Link>
                ) : null}
                <Nav.Link href="/clubes">
                  Clubes <IoIosFootball />
                </Nav.Link>
                <Link to={`/clientes/edit/${decoded.user_id}`}>
                  Bienvenido: {decoded.nickname}
                </Link>{" "}
                <Button
                  className="btn btn-outline-danger ms-auto boton-logout"
                  onClick={() => logout()}
                >
                  <span className="material-symbols-outlined ms-auto boton-logout">
                    {" "}
                    logout
                  </span>
                </Button>
              </Nav>
            </Navbar.Collapse>
            <CartElements />
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar
          expand="lg"
          className=" navbar-expand-lg bg-primary"
          data-bs-theme="dark"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image
                className="circular"
                src="icono messi.ico"
                roundedCircle
                width="50"
                height="50"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>

                <Link to="/login" className="nav-link">
                  {" "}
                  Login / Registrarse
                </Link>
                <Button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Menu;
