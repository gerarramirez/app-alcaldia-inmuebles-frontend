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
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/create-user" element={<CreateEmpleado/>} />
            <Route path="/edit-user/:id" element={<EditEmpleado/>} />
            <Route path="/create-propietario" element={<CreatePropietario/>} />
            <Route path="/edit-propietario/:id" element={<EditPropietario/>} />
            <Route path="/create-usuario" element={<CreateUsuario/>} />
            <Route path="/create-inmueble" element={<CreateInmueble/>} />



          </Routes>
          
        </div>
      </header>
    </div>
  );
}
export default App;
