import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";
const Header =(props) => {
  const {loggedIn, setLoggedIn} = props;
  


  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <img id="logo" src="https://sanmarcos.gob.sv/wp-content/uploads/2022/05/LOGO-PNG-2.5.png"/>
          <Link to="/" className="navbar-brand" href="#">
            <span className="navbar-text">SISTEMA DE REGISTRO DE INMUEBLE</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {
                loggedIn?
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
                : <div></div>  
              }
              </li>
              <li className="nav-item">
              {
                loggedIn?
                <Link className="nav-link" to="create-user">
                  Empleado
                </Link>
                : <div></div>  
              }
              </li>
              <li className="nav-item">
              {
                loggedIn?
                <Link className="nav-link" to="create-usuario">
                  Usuario
                </Link>
                : <div></div>  
              }
              </li>
              <li className="nav-item">
              {
                loggedIn?
                <Link className="nav-link" to="create-propietario">
                  Propietario
                </Link>
                 : <div></div>  
                }
              </li>
              <li className="nav-item">
                {
                loggedIn?
                <Link className="nav-link" to="create-inmueble">
                  Inmueble
                </Link>
                 : <div></div>  
                }
              </li>
              <li className="nav-item">
                {
                loggedIn?
                <Link className="nav-link" to="create-facturacion">
                  facturación
                </Link>
                 : <div></div>  
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;