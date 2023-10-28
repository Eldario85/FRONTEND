import React from "react";
import { useContext } from "react";
import { dataContext } from "./Context/DataContext";
import "../componentes/products.css";

function Products() {
  const { data, cart, setCart } = useContext(dataContext);

  const AgregarCarrito = (product) => {
    setCart([...cart, product]);
  };

  return data.map((product) => {
    return (
      <div className="card" key={product.camiseta_id}>
        <img src={product.imagen} />
        <h3>{product.nombre_del_producto}</h3>
        <h4>{product.precio}</h4>
        <button onClick={() => AgregarCarrito(product)}>comprar</button>
      </div>
    );
  });
}

export default Products;
