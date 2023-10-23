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
debugger
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
    var tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
    const rol = tokenDecoded.rol_id;
    if (rol === 1) {
      const filas = this.state.clientes.map((cliente, index) => (
        <tr key={index}>
          <td>{cliente.nickname}</td>
          <td>{cliente.nombre}</td>
          <td>{cliente.apellido}</td>
          <td>{cliente.direccion}</td>
          <td>{cliente.telefono}</td>
          <td>{cliente.email}</td>
  
          <td>
            <Link
              to={{
                pathname: `/clientes/edit/${cliente.user_id}`,
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
                  <th>Nickname</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Mail</th>
  
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>{filas}</tbody>
              <Link to={`/clientes/edit`} className="btn btn-primary">
                <span className="material-symbols-outlined">editar</span>
              </Link>
            </table>
            <br />
            {/* <Link to="/clientes/edit" className="btn btn-info">
              Nuevo Cliente
            </Link> */}
          </div>
        </>
      );
    } else {
      return(
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
  
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>   <tr>
          <td>{this.state.clientes[1].nickname}</td>
          <td>{this.state.clientes[1].nombre}</td>
          <td>{this.state.clientes[1].apellido}</td>
          <td>{this.state.clientes[1].direccion}</td>
          <td>{this.state.clientes[1].telefono}</td>
          <td>{this.state.clientes[1].email}</td>
  
          <td>
            <Link
              to={{
                pathname: `/clientes/edit/${this.state.clientes.user_id}`,
                state: { Clientes },
              }}
              className="btn btn-primary"
            >
              <span className="material-symbols-outlined">edit</span>
            </Link>
          </td>
        </tr></tbody>
              <Link to={`/clientes/edit`} className="btn btn-primary">
                <span className="material-symbols-outlined">editar</span>
              </Link>
            </table>
            <br />
            {/* <Link to="/clientes/edit" className="btn btn-info">
              Nuevo Cliente
            </Link> */}
          </div>
        </>
      )
      
    }
  
  }
}

export default Clientes;
