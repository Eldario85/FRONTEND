import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Internal_Productos_Edit(props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(null);
  const [stock, setStock] = useState(null);
  const [equipo_id, setEquipoId] = useState(null);
  const [talla_id, setTallaId] = useState(null);

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

      fetch(`http://localhost:8000/camisetas/${id}`, parametros)
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
            setNombre(result.body.detail.nombre_del_producto);
            setDescripcion(result.body.detail.descripcion);
            setPrecio(result.body.detail.precio);
            setStock(result.body.detail.stock);
            setEquipoId(result.body.detail.equipo_id);
            setTallaId(result.body.detail.talla_id);
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

    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      equipo_id: equipo_id,
      talla_id: talla_id,
    };

    const parametros = {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = id
      ? `http://localhost:8000/camisetas/${id}`
      : "http://localhost:8000/camisetas";

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nombre_del_producto":
        setNombre(value);
        break;
      case "descripcion":
        setDescripcion(value);
        break;
      case "precio":
        setPrecio(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "equipo_id":
        setEquipoId(value);
        break;
      case "talla_id":
        setTallaId(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>{id ? `Edicion del producto ${id}` : "Alta de producto"}</h1>
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
                placeholder="Nombre"
                onChange={handleChange}
                value={nombre}
                name="nombre_del_producto"
              />
              <label htmlFor="floatingNombre">Nombre</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingDescripcion"
                placeholder="Descripcion"
                onChange={handleChange}
                value={descripcion}
                name="descripcion"
              />
              <label htmlFor="floatingDescripcion">Descripcion</label>
            </div>
            <br />

            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="precio"
                placeholder="Precio"
                onChange={handleChange}
                value={precio}
                name="precio"
              />

              <label htmlFor="precio">Precio $</label>
            </div>
            <br />

            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="stock"
                placeholder="Stock"
                onChange={handleChange}
                value={stock}
                name="stock"
              />

              <label htmlFor="stock">Stock</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="equipo_id"
                placeholder="Equipo_id"
                onChange={handleChange}
                value={equipo_id}
                name="equipo_id"
              />

              <label htmlFor="Equipo_id">Equipo</label>
            </div>
            <br />
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="talla"
                placeholder="Talla"
                onChange={handleChange}
                value={talla_id}
                name="talla_id"
              />

              <label htmlFor="talla">Talla</label>
            </div>
            <br />
            <br />
            <input className="btn btn-primary" type="submit" value="Guardar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Productos_Edit() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Internal_Productos_Edit params={params} navigate={navigate} />
    </>
  );
}
