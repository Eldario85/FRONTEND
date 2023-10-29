import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function Clubes() {
  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    const parametros = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
    };

    fetch("clubes.json", parametros)
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
          setClubes(result.body);
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

  const cards = clubes.map((club, index) => (
    <div key={index} className="d-flex justify-content-around">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={club.escudo_img} />
        <Card.Body>
          <Card.Title>{club.nombre}</Card.Title>
          <Card.Text>Fecha fundacion: {club.fecha_fundacion}</Card.Text>
          <Card.Text>Lugar de origen: {club.lugar_origen}</Card.Text>
          <Card.Text>Liga en la que juega: {club.liga}</Card.Text>
          <Card.Text>DT: {club.Dt}</Card.Text>
          <Card.Text>Estadio: {club.estadio}</Card.Text>
          <Card.Text>Mas Info: {club.sitio_oficial}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        backgroundColor: "black",
      }}
    >
      {cards}
    </div>
  );
}

export default Clubes;
