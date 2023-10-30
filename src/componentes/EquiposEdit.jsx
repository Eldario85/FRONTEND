import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Productos.css";

export default function EquiposEdit() {
  const [nombre_del_equipo, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [liga, setLiga] = useState("");
  const [anio_de_fundacion, setAño] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const parametros = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: sessionStorage.getItem("token"),
        },
      };

      fetch(`http://localhost:8000/equipos/${id}`, parametros)
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
            setNombre(result.body.detail.nombre_del_equipo);
            setPais(result.body.detail.pais);
            setLiga(result.body.detail.liga);
            setAño(result.body.detail.anio_de_fundacion);
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
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const equipo = {
      nombre_del_equipo: nombre_del_equipo,
      pais: pais,
      liga: liga,
      anio_de_fundacion: anio_de_fundacion,
    };

    const parametros = {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(equipo),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    const url = id
      ? `http://localhost:8000/equipos/${id}`
      : "http://localhost:8000/equipos";

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
          navigate("/equipos");
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nombre_del_equipo":
        setNombre(value);
        break;
      case "pais":
        setPais(value);
        break;
      case "liga":
        setLiga(value);
        break;
      case "anio_de_fundacion":
        setAño(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="row edicion-equip">
        <div className="col">
          <h1>{id ? `Edicion del equipo ${id}` : "Alta de equipo"}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingNombre"
                placeholder="Nombre_del_equipo"
                onChange={handleChange}
                value={nombre_del_equipo}
                name="nombre_del_equipo"
              />
              <label htmlFor="floatingNombre">Nombre</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPais"
                placeholder="Pais"
                onChange={handleChange}
                value={pais}
                name="pais"
              />
              <label htmlFor="floatingPais">Pais</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingLiga"
                placeholder="liga"
                onChange={handleChange}
                value={liga}
                name="liga"
              />
              <label htmlFor="floatingLiga">Liga</label>
            </div>
            <br />

            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="anio_de_fundacion"
                placeholder="anio_de_fundacion"
                onChange={handleChange}
                value={anio_de_fundacion}
                name="anio_de_fundacion"
              />

              <label htmlFor="anio_de_fundacion">Año de fundacion</label>
            </div>
            <br />

            <br />

            <br />
            <input className="btn btn-primary" type="submit" value="Guardar" />
          </form>
        </div>
      </div>
    </div>
  );
}
