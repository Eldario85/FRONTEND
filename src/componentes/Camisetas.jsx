import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import { dataContext } from "./context/DataContext";
import { useContext } from "react";

const Camisetas = () => {
  const [camisetas, setCamisetas] = useState([]);
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  // const { carrito, setCarrito } = useContext(dataContext) || {};
  const navigate = useNavigate();

  const closeModal = () => {
    setModal(false);
    setIdToDelete(null);
    navigate("/camisetas")
  };

  const showModal = (id) => {
    setModal(true);
    setIdToDelete(id);
    navigate("/camisetas")
  };

  const handleClickDelete = () => {
    const parametros = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token")
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
          navigate("/camisetas")
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

  useEffect(() => {
    const parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/camisetas", parametros)
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
          setCamisetas(result.body);
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
  }, []);

  const Comprar = (camisetas) => {
    console.log("me compraste");
    setCarrito([...carrito, producto]);
  };

  const cards = camisetas.map((camiseta, index) => (
    <div key={index} className="d-flex justify-content-around">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={camiseta.imagen} />
        <Card.Body>
          <Card.Title>{camiseta.nombre_del_producto}</Card.Title>
          <Card.Text>{camiseta.descripcion}</Card.Text>
          <Card.Text>Precio: ${camiseta.precio}</Card.Text>
          <Button variant="primary" onClick={Comprar}>
            Agregar al carrito
          </Button>
        </Card.Body>
        <Link
          to={`/camisetas/edit/${camiseta.camiseta_id}`}
          className="btn btn-primary"
        >
          <span className="material-symbols-outlined">edit</span>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => showModal(camiseta.camiseta_id)}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="d-flex justify-content-around">
        {cards}
        <br />
        <Link to="/camisetas/edit" className="btn btn-info">
          Nuevo Producto
        </Link>
      </div>

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
