import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditEmpleado = () => {
    const [empleado, setEmpleado] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const getEmpleadoApi = "http://localhost:8084/alcaldia/catalogo/empleado";

    useEffect(() => {
        getEmpleado();
    }, []);

    const getEmpleado = () => {
        axios
            .get(getEmpleadoApi.concat("/findById/") + id)
            .then((item) => {
                setEmpleado(item.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        setEmpleado({ ...empleado, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        console.log(JSON.stringify(empleado));
        console.log(getEmpleadoApi);


        fetch(getEmpleadoApi.concat("/update"), {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8;',
            },
            body: JSON.stringify(empleado),
        })
            .then((response) => {
                console.log(response);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setIsLoading(true);
                navigate("/create-user");
            })
            .then((data) => {
                console.log("fata");

                setIsLoading(true);
                navigate("/create-user");
            })
            .catch((error) => {
                console.log("error papi");
                setError(error.message);
                setIsLoading(false);
            })
    };

    return (
        <div className="user-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Editar Empleado</p>
            </div>
            <form onSubmit={handelSubmit}>
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
                        value={empleado.nombre}
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
                        value={empleado.apellido}
                        onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={empleado.email}
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
export default EditEmpleado;
