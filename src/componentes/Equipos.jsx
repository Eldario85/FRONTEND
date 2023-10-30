import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/App.css";
import { Link } from "react-router-dom";

function Equipos() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("http://localhost:8000/equipos", parametros)
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
          setEquipos(result.body);
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

  const filas = equipos.map((equipo, index) => (
    <tr key={index}>
      <td>{equipo.equipo_id}</td>
      <td>{equipo.nombre_del_equipo}</td>
      <td>{equipo.pais}</td>
      <td>{equipo.liga}</td>
      <td>{equipo.anio_de_fundacion}</td>
      <Link
        to={`/equipos/edit/${equipo.equipo_id}`}
        className="btn btn-primary"
      >
        <span className="material-symbols-outlined">Editar equipo</span>
      </Link>
    </tr>
  ));

  return (
    <>
      <div>
        <table className="table  table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre Equipo</th>
              <th>Pais</th>
              <th>Liga</th>
              <th>Año Fundacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{filas}</tbody>
        </table>
        <br />
      </div>
    </>
  );
}

export default Equipos;
