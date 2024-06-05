import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import CreateEmpleado from "./components/empleado/CreateEmpleado";
import Home from './components/Layout/Home'
import EditEmpleado from "./components/empleado/EditEmpleado";
import CreatePropietario from "./components/Propietario/CreatePropietario";
import EditPropietario from "./components/Propietario/EditPropietaio";
import CreateUsuario from "./components/Usuario/CreateUsuario";
import CreateInmueble from "./components/Inmueble/CreateInmueble";
import CreateFacturacion from "./components/Facturacion/CreateFacturacion";
import LoginPage from "./components/login/LoginPage";
import React, { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/create-user" element={<CreateEmpleado loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/edit-user/:id" element={<EditEmpleado loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/create-propietario" element={<CreatePropietario loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/edit-propietario/:id" element={<EditPropietario loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/create-usuario"  element={<CreateUsuario loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/create-inmueble" element={<CreateInmueble loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/create-facturacion" element={<CreateFacturacion loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

          </Routes>
          
        </div>
      </header>
    </div>
  );
}
export default App;
