import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import Loader from '../Common/Loader';
import './User.css';
import axios from "axios";





const CreateUsuario = () => {
    const navigate = useNavigate();
    const createUsuarioApi = "http://localhost:8084/alcaldia/catalogo/usuario/create"
    const getAllEmpleadoApi = "http://localhost:8084/alcaldia/catalogo/empleado/findALLWithoutUser"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [empleados, setEmpleado] = useState([{
        id: "",
        nombre: "",
        email: "",
        apellido: ""
    }]);
    const [usuario, setUser] = useState({
        usuario: "",
        clave: "",
        empleado: ""

    })

    useEffect(() => {
        getEmpleado();
    }, []);

    const getEmpleado = () => {
        axios
            .get(getAllEmpleadoApi)
            .then((res) => {
                console.log(res.data);
                setEmpleado(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelInput = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        if(name == 'empleado'){
            value = { "id" : value}
        }
        console.log(name, value)
        setUser({ ...usuario, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(usuario)
        try {
            setIsLoading(true);
            const response = await fetch(createUsuarioApi, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8;',
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({
                    usuario: "",
                    clave: "",
                    empleado: ""
                })
                navigate('/create-usuario');
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
                    <p>Registrar Usuario</p>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Usuario</label>
                        <input type="text" required className="form-control" id="usuario" name="usuario" value={usuario.usuario} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Clave</label>
                        <input type="password" required className="form-control" id="clave" name="clave" value={usuario.clave} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Empleado</label>
                        <select className="form-control" id="empleado" name="empleado" value={usuario.empleado.nombre} onChange={handelInput} >
                        {empleados.map((data, i) => (
                            <option key={i} value={data.id}>
                              {data.nombre}
                            </option>
                          ))}
                        </select>    
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
            <div>
                <ShowUsuario />
            </div>
        </div>

    )
}

const ShowUsuario = () => {
    const showUsuarioApi = "http://localhost:8084/alcaldia/catalogo/usuario/findAll";

    const [usuario, setUsuario] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getUsuario();
    }, []);

    const getUsuario = () => {
        axios
            .get(showUsuarioApi)
            .then((res) => {
                console.log(res.data);
                setUsuario(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (usuario.length < 0) {
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
                            <th>Usuario</th>
                            <th>Clave</th>
                            <th>Empleado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.usuario}</td>
                                    <td>{item.clave}</td>
                                    <td>{item.empleado.nombre}</td>
                                    <td>
                                        <Link to={`/edit-usuario/${item.id}`}>
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

export default CreateUsuario