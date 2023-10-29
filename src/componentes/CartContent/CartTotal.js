import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

function CartTotal() {
  const { cart } = useContext(dataContext);

  const total = cart.reduce((acc, el) => acc + el.precio, 0);

  return (
    <div className="carTotal">
      <h3>Total a Pagar: ${total}</h3>
    </div>
  );
}

export default CartTotal;
