import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditPropietario = (props) => {
    const [propietario, setPropietario] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {loggedIn, setLoggedIn}  = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const getPropietarioApi = "http://localhost:8084/api/alcaldia/catalogo/propietario";

    useEffect(() => {
        if(!loggedIn){
            navigate("/login");
        }
      }, [loggedIn]);
      
    useEffect(() => {
        getPropietario();
    }, []);

    const getPropietario = () => {
        axios
            .get(getPropietarioApi.concat("/findById/") + id)
            .then((item) => {
                setPropietario(item.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        setPropietario({ ...propietario, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        fetch(getPropietarioApi.concat("/update"), {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8;',
            },
            body: JSON.stringify(propietario),
        })
            .then((response) => {
                console.log(response);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setIsLoading(true);
                navigate("/create-propietario");
            })
            .then((data) => {
                console.log("fata");

                setIsLoading(true);
                navigate("/create-propietario");
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            })
    };

    return (
        <div className="user-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Editar Propietario</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="tipoDocumento" className="form-label">
                        Tipo de documento
                    </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="tipoDocumento"
                        name="tipoDocumento"
                        value={propietario.tipoDocumento}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3">
                    <label for="documento" className="form-label">
                        Documento
                    </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="documento"
                        name="documento"
                        value={propietario.documento}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3">
                    <label for="nombre" className="form-label">
                        Nombre
                    </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={propietario.nombre}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3">
                    <label for="apellido" className="form-label">
                        Apellido
                    </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="apellido"
                        name="apellido"
                        value={propietario.apellido}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3">
                    <label for="telefono" className="form-label">
                        Documento
                    </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={propietario.telefono}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label for="correoElectronico" className="form-label">
                        Correo Electronico
                    </label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="correoElectronico"
                        name="correoElectronico"
                        value={propietario.correoElectronico}
                        onChange={handelInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                    Editar
                </button>
            </form>
        </div>
    );
};
export default EditPropietario;
