import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Clientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      //cliente: props.location.state.cliente,
    
    };
    
  }

  componentDidMount() {
    let parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/cliente", parametros)
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
            clientes: result.body,
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

 

  render() {
    const filas = this.state.clientes.map((cliente, index) => (
      <tr key={index}>
        <td>{cliente.nombre}</td>
        <td>{cliente.apellido}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.telefono}</td>
        <td>{cliente.correo_electronico}</td>
        <td>{cliente.usuarioId}</td>
        <td>
          <Link
            to={{
              pathname: `/clientes/edit/${cliente.id}`,
              state: { cliente },
            }}
            className="btn btn-primary"
          >
            <span className="material-symbols-outlined">edit</span>
          </Link>


        </td>
      </tr>
    ));
    return (
      <>
        <div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Mail</th>
                <th>usuarioId</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
          <br />
          <Link to="/clientes/edit" className="btn btn-info">
            Nuevo Cliente
          </Link>
        </div>


      </>
    );
  }
}

export default Clientes;
