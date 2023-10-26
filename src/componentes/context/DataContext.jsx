import { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [carrito, setCarritto] = useState([]);
  debugger;
  useEffect(() => {
    fetch("http://localhost:8000/camisetas").then((res) => setData(res.data));
  });
  return (
    <dataContext.Provider value={{ data, carrito, setCarritto }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
