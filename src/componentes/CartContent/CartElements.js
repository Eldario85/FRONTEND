import React, { useEffect } from "react";
import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
// import "./CartContent.css";
import { toast } from "react-toastify";

import { useState } from "react";

export const CartElements = () => {
  const { cart, setCart } = useContext(dataContext);
  const [active, setActive] = useState(false);

  // Función para limpiar el carrito
  const LimpiarCarrito = () => {
    setCart([]);
  };

  // Función para realizar la compra
  const compra = () => {
    toast.success(
      "Gracias por su Compra!!",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      },
      setCart([])
    );
  };

  // Función para borrar un item del carrito
  const borrarItem = (product) => {
    const newArray = cart.filter(
      (item) => item.camiseta_id !== product.camiseta_id
    );
    setCart(newArray);
  };

  // Función para agrupar los productos repetidos en un solo objeto
  const groupProducts = () => {
    const groupedProducts = {};

    cart.forEach((product) => {
      if (!groupedProducts[product.camiseta_id]) {
        groupedProducts[product.camiseta_id] = {
          product,
          quantity: 1,
        };
      } else {
        groupedProducts[product.camiseta_id].quantity++;
      }
    });

    return groupedProducts;
  };

  // Convertimos el objeto de productos agrupados a un array
  const groupedProductsArray = Object.values(groupProducts());

  // Total del carrito
  const total = groupedProductsArray.reduce(
    (acc, el) => acc + el.product.precio * el.quantity,
    0
  );

  // Contador de productos en el carrito
  const contador = groupedProductsArray.length;

  // Función para actualizar el estado del carrito
  const updateCart = () => {
    setCart(groupedProductsArray);
  };

  // // Función para agregar una unidad a un producto
  // const addProduct = (product) => {
  //   product.quantity++;
  //   updateCart();
  // };

  // // Función para restar una unidad a un producto
  // const removeProduct = (camiseta_id) => {
  //   const productIndex = groupedProductsArray.findIndex(
  //     (product) => product.product.camiseta_id === camiseta_id
  //   );

  //   if (productIndex > -1) {
  //     groupedProductsArray[productIndex].quantity--;

  //     if (groupedProductsArray[productIndex].quantity === 0) {
  //       groupedProductsArray.splice(productIndex, 1);
  //     }

  //     updateCart();
  //   }
  // };

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
          {groupedProductsArray.length ? (
            <>
              <div className="row-product">
                {groupedProductsArray.map((product) => (
                  <div
                    className="cart-product"
                    key={product.product.camiseta_id}
                  >
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <p className="titulo-producto-carrito">
                        {product.product.nombre_del_producto}
                      </p>
                      <span className="precio-producto-carrito">
                        ${product.product.precio}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => borrarItem(product.product)}
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
            <button onClick={compra} className="btn-clear-all">
              Confirmar Pedido
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default CartElements;
