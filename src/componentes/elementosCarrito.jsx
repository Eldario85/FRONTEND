import { useContext } from "react";
import { dataContext } from "./context/DataContext";

import React from "react";

export const elementosCarrito = () => {
  const { cart } = useContext(dataContext);
  return cart.map((producto) => {
    return (
      <div className="cartContent" key={producto.id}>
        <img src={producto.imagen} alt="" />
        <h3 className="name">{producto.name}</h3>
        <p className="price">${producto.precio}</p>
      </div>
    );
  });
};