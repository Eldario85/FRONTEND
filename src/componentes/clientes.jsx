import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import jwt_decode from "jwt-decode";

class Clientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
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

    fetch("http://localhost:8000/usuario", parametros)
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
        <td>{cliente.nickname}</td>
        <td>{cliente.nombre}</td>
        <td>{cliente.apellido}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.telefono}</td>
        <td>{cliente.email}</td>
      </tr>
    ));
    return (
      <>
        <div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nickname</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Mail</th>
              </tr>
            </thead>
            <tbody>{filas}</tbody>
          </table>
          <br />
        </div>
      </>
    );
  }
}

export default Clientes;
