import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import Loader from '../Common/Loader';
import './User.css';
import axios from "axios";





const CreatePropietario = () => {
    const navigate = useNavigate();
    const createPropietarioApi = "http://localhost:8084/alcaldia/catalogo/propietario/create"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [propietario, setUser] = useState({
        tipoDocumento: "",
        documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correoElectronico: "",

    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...propietario, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(propietario)
        try {
            setIsLoading(true);
            const response = await fetch(createPropietarioApi, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8;',
                },
                body: JSON.stringify(propietario),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({
                    tipoDocumento: "",
                    documento: "",
                    nombre: "",
                    apellido: "",
                    telefono: "",
                    correoElectronico: ""
                })
                navigate('/create-propietario');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className='user-form'>
                <div className='heading'>
                    {isLoading && <Loader />}
                    {error && <p>Error: {error}</p>}
                    <p>Registrar Propietario</p>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Tipo de documento</label>
                        <input type="text" required className="form-control" id="tipoDocumento" name="tipoDocumento" value={propietario.tipoDocumento} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Documento</label>
                        <input type="text" required className="form-control" id="documento" name="documento" value={propietario.documento} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="nombre" name="nombre" value={propietario.nombre} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Apellido</label>
                        <input type="text" required className="form-control" id="apellido" name="apellido" value={propietario.apellido} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Telefono</label>
                        <input type="text" required className="form-control" id="telefono" name="telefono" value={propietario.telefono} onChange={handelInput} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Correo Electronico</label>
                        <input type="email" required className="form-control" id="correoElectronico" name="correoElectronico" value={propietario.correoElectronico} onChange={handelInput} />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
            <div>
                <ShowPropietario />
            </div>
        </div>

    )
}

const ShowPropietario = () => {
    const showPropietarioApi = "http://localhost:8084/alcaldia/catalogo/propietario/findAll";

    const [propietario, setPropietario] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getPropietario();
    }, []);

    const getPropietario = () => {
        axios
            .get(showPropietarioApi)
            .then((res) => {
                console.log(res.data);
                setPropietario(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (propietario.length < 0) {
        return <h1>no user found</h1>;
    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo de documento</th>
                            <th>Documento</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Correo Electronico</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propietario?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.tipoDocumento}</td>
                                    <td>{item.documento}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.telefono}</td>
                                    <td>{item.correoElectronico}</td>
                                    <td>
                                        <Link to={`/edit-propietario/${item.id}`}>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default CreatePropietario