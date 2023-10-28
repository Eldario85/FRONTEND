import React from "react";
import { useContext } from "react";
import { dataContext } from "./context/DataContext";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

function CartContent() {
  const { cart } = useContext(dataContext);

  return cart.length > 0 ? (
    <>
      <CartElements />;
      <CartTotal />;
    </>
  ) : (
    <h2 className="cart-message-center">Tu carrito esta vacio</h2>
  );
}

export default CartContent;
