import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "./Context/DataContext";
import "../styles/Productos.css";

import jwt_decode from "jwt-decode";

const Camisetas = () => {
  const { data, cart, setCart } = useContext(dataContext);
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const navigate = useNavigate();

  const closeModal = () => {
    setModal(false);
    setIdToDelete(null);
    navigate("/camisetas");
  };

  const showModal = (id) => {
    setModal(true);
    setIdToDelete(id);
    navigate("/camisetas");
  };

  const AgregarCarrito = (product) => {
    setCart([...cart, product]);
    toast.success("Producto agregado al carrito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleClickDelete = () => {
    const parametros = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    const url = `http://localhost:8000/camisetas/${idToDelete}`;
    fetch(url, parametros)
      .then((res) =>
        res.json().then((body) => ({
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body,
        }))
      )
      .then((result) => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setModal(false);
        } else {
          toast.error(result.body.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  var tokenDecoded = jwt_decode(sessionStorage.getItem("token"));
  const rol = tokenDecoded.rol_id;

  return (
    <>
      <h2 className="titulos">Camisetas a la venta</h2>
      {rol === 1 ? (
        <Link to="/camisetas/edit" className="btn btn-info">
          Nuevo Producto
        </Link>
      ) : null}
      <Row xs={1} md={2} className="g-4">
        {data.map((product, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src={product.imagen}
                alt={product.nombre_del_producto}
              />
              <Card.Body>
                <Card.Title>{product.nombre_del_producto}</Card.Title>
                <Card.Text>{product.descripcion}</Card.Text>
                <Card.Text>${product.precio}</Card.Text>

                <Button onClick={() => AgregarCarrito(product)}>
                  Añadir al Carrito
                </Button>
                {rol === 1 ? (
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(product.camiseta_id)}
                  >
                    Eliminar{" "}
                  </Button>
                ) : null}
                {rol === 1 ? (
                  <Link
                    to={`/camisetas/edit/${product.camiseta_id}`}
                    className="btn btn-secondary"
                  >
                    <span className="material-symbols-outlined">Editar</span>
                  </Link>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={modal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de eliminar el producto seleccionado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Camisetas;
