import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/App.css";

export class Internal_Clientes_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nickname: "",
      email: "",
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: null,
      password: "",

      modal: false,
    };
  }

  componentDidMount() {
    if (this.props.params.id) {
      let parametros = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: sessionStorage.getItem("token"),
        },
      };

      fetch(`http://localhost:8000/usuario/${this.props.params.id}`, parametros)
        .then((res) => {
          return res.json().then((body) => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body,
            };
          });
        })
        .then((result) => {
          if (result.ok) {
            this.setState({
              nickname: result.body.detail.nickname,
              nombre: result.body.detail.nombre,
              apellido: result.body.detail.apellido,
              direccion: result.body.detail.direccion,
              telefono: result.body.detail.telefono,
              email: result.body.detail.email,
              password: result.body.detail.password,
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
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let cliente = {
      nickname: this.state.nickname,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      email: this.state.email,
      password: this.state.password,
    };

    let parametros = {
      method: "PUT",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };
    fetch(`http://localhost:8000/usuario/${this.props.params.id}`, parametros)
      .then((res) => {
        return res.json().then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        });
      })
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
          this.props.navigate("/clientes");
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
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row titulos">
          <div className="col">
            <h1>{`Edicion del Cliente ${this.state.nickname}`}</h1>
          </div>
        </div>

        <div className="row ">
          <div className="col ">
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control "
                  id="floatingNickname"
                  placeholder="nickname"
                  onChange={this.handleChange}
                  value={this.state.nickname}
                  name="nickname"
                />
                <label for="nickname">Nickname</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />
                <label for="email">Email</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingNombre"
                  placeholder="Nombre"
                  onChange={this.handleChange}
                  value={this.state.nombre}
                  name="nombre"
                />
                <label htmlFor="floatingNombre">Nombre</label>
              </div>
              <br />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingApellido"
                  placeholder="Apellido"
                  onChange={this.handleChange}
                  value={this.state.apellido}
                  name="apellido"
                />
                <label htmlFor="floatingApellido">Apellido</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  placeholder="Direccion"
                  onChange={this.handleChange}
                  value={this.state.direccion}
                  name="direccion"
                />

                <label htmlFor="direccion">Direccion</label>
              </div>
              <br />

              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  placeholder="telefono"
                  onChange={this.handleChange}
                  value={this.state.telefono}
                  name="telefono"
                />
                <label for="telefono">Telefono</label>
              </div>
              <br />

              <input
                className="btn btn-primary"
                type="submit"
                value="Guardar"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Clientes_Edit;

export function Clientes_Edit() {
  const p = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Internal_Clientes_Edit navigate={navigate} params={p} />
    </>
  );
}
