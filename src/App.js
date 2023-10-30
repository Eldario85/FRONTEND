// import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Camisetas from "./componentes/Camisetas";
import Camisetas_Edit from "./componentes/Camisetas_Edit";
import Clientes_Edit from "./componentes/clientes_Edit";
import Clientes from "./componentes/clientes";
import Pedidos from "./componentes/Pedidos";
import Pedidos_Edit from "./componentes/Pedidos_Edit";
import DataProvider from "./componentes/Context/DataContext";
import Clubes from "./componentes/Clubes";

function App() {
  return (
    <>
      <DataProvider>
        <Menu />
        <ToastContainer />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/camisetas" element={<Camisetas />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/clientes/edit" element={<Clientes_Edit />}></Route>
            <Route
              path="/clientes/edit/:id"
              element={<Clientes_Edit />}
            ></Route>
            <Route path="/clientes" element={<Clientes />}></Route>
            <Route path="/camisetas/edit" element={<Camisetas_Edit />} />
            <Route path="/camisetas/edit/:id" element={<Camisetas_Edit />} />
            <Route path="/pedido" element={<Pedidos />} />
            <Route path="/pedido/edit" element={<Pedidos_Edit />} />

            <Route path="/clubes" element={<Clubes />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
