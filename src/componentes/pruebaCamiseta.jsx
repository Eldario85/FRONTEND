import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class CamisetaForm extends Component {
  initialValues = {
    nombre_del_producto: "",
    descripcion: "",
    precio: "",
    stock: "",
    equipo_id: "",
    talla_id: "",
    imagen_url: "",
  };

  validationSchema = Yup.object().shape({
    nombre_del_producto: Yup.string().required(
      "El nombre del producto es obligatorio"
    ),
    precio: Yup.number().required("El precio es obligatorio"),
    stock: Yup.number().required("El stock es obligatorio"),
    equipo_id: Yup.number().required("El equipo es obligatorio"),
    talla_id: Yup.number().required("La talla es obligatoria"),
    imagen_url: Yup.string().required("La URL de la imagen es obligatoria"),
  });

  handleSubmit = (values, actions) => {
    let data = {
      id: this.state.id,
      nombre: this.state.nombre_del_producto,
      descripcion: this.state.descripcion,
      precio: this.state.precio,
      imagen: this.state.imagen_url,
    };

    let parametros = {
      method: this.props.params.id ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = this.props.params.id
      ? `http://localhost:8000/camisetas/${this.props.params.id}`
      : "http://localhost:8000/camisetas";
    fetch(url, parametros)
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
          this.props.navigate("/camisetas");
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
    // Aquí puedes enviar los datos del formulario a tu servidor para almacenar en la base de datos.
    // Debes manejar la lógica de envío de datos en esta función.
    console.log("Valores a enviar al servidor:", data);
    actions.setSubmitting(false);
  };

  render() {
    return (
      <div>
        <h1>Cargar Camiseta</h1>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="nombre_del_producto">Nombre del Producto</label>
                <Field type="text" name="nombre_del_producto" />
                <ErrorMessage name="nombre_del_producto" component="div" />
              </div>
              /* Agrega los campos restantes aquí, como precio, stock,
              equipo_id, talla_id, etc. */
              <div>
                <label htmlFor="imagen_url">URL de la Imagen</label>
                <Field type="text" name="imagen_url" />
                <ErrorMessage name="imagen_url" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Cargar Camiseta
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default CamisetaForm;
