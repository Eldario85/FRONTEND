import React, { useEffect } from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import "./CartContent.css";

import { useState } from "react";

export const CartElements = () => {
  const { cart, setCart } = useContext(dataContext);
  const [active, setActive] = useState(false);

  const LimpiarCarrito = (product) => {
    console.log(product);
    setCart([]);
  };
  const total = cart.reduce((acc, el) => acc + el.precio, 0);
  const contador = cart.length;

  return (
    <header>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{contador}</span>
          </div>
        </div>

        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {cart.length ? (
            <>
              <div className="row-product">
                {cart.map((product) => (
                  <div className="cart-product" key={product.camiseta_id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.cantidad}
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.nombre_del_producto}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.precio}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => removeFromCart(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>

              <button
                className="btn-clear-all btn-danger"
                onClick={LimpiarCarrito}
              >
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
          {total === 0 ? null : (
            <button className="btn-clear-all">Confirmar Pedido</button>
          )}
        </div>
      </div>
    </header>
  );
};
// function CartElements() {

//   // const { cart } = useContext(dataContext);

//   // return cart.map((product) => {
//   //   return (
//   //     <div className="carritContent" key={product.camiseta_id}>
//   //       <img src={product.imagen} />
//   //       <h3 className="nombre">{product.nombre_del_producto}</h3>
//   //       <h4 className="precio">${product.precio}</h4>
//   //     </div>
//   //   );
//   // });
// }

export default CartElements;
