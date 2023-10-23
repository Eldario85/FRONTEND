import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

class Productos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      modal: false,
      idToDelete: null,
    };

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    let parametros = {
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
          this.setState({
            productos: result.body,
            modal: false,
          });
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
  }

  closeModal() {
    this.setState({
      modal: false,
      idToDelete: null,
    });
  }

  showModal(id) {
    this.setState({
      modal: true,
      idToDelete: id,
    });
  }

  handleClickDelete() {
    let parametros = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `http://localhost:8000/camisetas/${this.state.idToDelete}`;
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
          this.componentDidMount();
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
  }

  render() {
    const cards = this.state.productos.map((producto, index) => (
      <div key={index} className="d-flex justify-content-around">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={producto.imagen_url} />
          <Card.Body>
            <Card.Title>{producto.nombre_del_producto}</Card.Title>
            <Card.Text>{producto.descripcion}</Card.Text>
            <Card.Text>Precio: ${producto.precio}</Card.Text>
            <Button variant="primary">Agregar al carrito</Button>
          </Card.Body>
          <Link
            to={`/camisetas/edit/${producto.camiseta_id}`}
            className="btn btn-primary"
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => this.showModal(producto.camiseta_id)}
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

        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro de eliminar el producto seleccionado?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleClickDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Productos;