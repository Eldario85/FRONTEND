import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
          navigate("/camisetas");
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

  // const cards = data.map((product, index) => (
  //   <div key={index} className="d-flex justify-content-around">
  //     <Card style={{ width: "18rem" }}>
  //       <Card.Img variant="top" src={product.imagen} />
  //       <Card.Body>
  //         <Card.Title>{product.nombre_del_producto}</Card.Title>
  //         <Card.Text>{product.descripcion}</Card.Text>
  //         <Card.Text>Precio: ${product.precio}</Card.Text>
  //         <Button variant="primary" onClick={() => AgregarCarrito(product)}>
  //           Agregar al carrito
  //         </Button>
  //       </Card.Body>
  //       {rol === 1 ? (
  //         <Link
  //           to={`/camisetas/edit/${product.camiseta_id}`}
  //           className="btn btn-primary"
  //         >
  //           <span className="material-symbols-outlined">edit</span>
  //         </Link>
  //       ) : null}
  //       {rol === 1 ? (
  //         <button
  //           className="btn btn-danger"
  //           onClick={() => showModal(product.camiseta_id)}
  //         >
  //           <span className="material-symbols-outlined">delete</span>
  //         </button>
  //       ) : null}
  //     </Card>
  //   </div>
  // ));

  return (
    <>
      {rol === 1 ? (
        <Link to="/camisetas/edit" className="btn btn-info">
          Nuevo Producto
        </Link>
      ) : null}

      <div className="container-items">
        {data.map((product) => (
          <div className="item" key={product.camiseta_id}>
            <figure>
              <img src={product.imagen} alt={product.nombre_del_producto} />
            </figure>
            <div className="info-product">
              <h2>{product.nombre_del_producto}</h2>
              <p className="price">${product.precio}</p>
              <button onClick={() => AgregarCarrito(product)}>
                Añadir al carrito
              </button>
              {rol === 1 ? (
                <button
                  className="btn btn-danger"
                  onClick={() => showModal(product.camiseta_id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              ) : null}
              {rol === 1 ? (
                <Link
                  to={`/camisetas/edit/${product.camiseta_id}`}
                  className="btn btn-primary"
                >
                  <span className="material-symbols-outlined">edit</span>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="d-flex justify-content-around">
        {cards}
        <br />
        {rol === 1 ? (
          <Link to="/camisetas/edit" className="btn btn-info">
            Nuevo Producto
          </Link>
        ) : null}
      </div> */}

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
