import React from "react";
import { useContext } from "react";
import { dataContext } from "./context/DataContext";

function CartElements() {
  const { cart } = useContext(dataContext);

  return cart.map((product) => {
    return (
      <div className="carritContent" key={product.camiseta_id}>
        <img src={product.imagen} />
        <h3 className="nombre">{product.nombre_del_producto}</h3>
        <h4 className="precio">{product.precio}</h4>
      </div>
    );
  });
}

export default CartElements;
