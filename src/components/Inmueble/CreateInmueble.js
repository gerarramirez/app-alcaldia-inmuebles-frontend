import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import Loader from '../Common/Loader';
import './User.css';
import axios from "axios";





const CreateInmueble = () => {
    const navigate = useNavigate();
    const createInmuebleApi = "http://localhost:8084/alcaldia/facturacion/inmueble/create"
    const getAllEmpleadoApi = "http://localhost:8084/alcaldia/catalogo/empleado/findAll"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [empleados, setEmpleado] = useState([{
        id: "",
        nombre: "",
        email: "",
        apellido: ""
    }]);
    const [inmueble, setInmueble] = useState({
        direccion: "",
        tipoInmueble: "",
        numHabitaciones: "",
        numBanios: "",
        precio: "",
        empleado: "",
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
        setEmpleado({ ...inmueble, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(inmueble)
        try {
            setIsLoading(true);
            const response = await fetch(createInmuebleApi, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8;',
                },
                body: JSON.stringify(inmueble),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setInmueble({
                    direccion: "",
                    tipoInmueble: "",
                    numHabitaciones: "",
                    numBanios: "",
                    precio: "",
                    empleado: "",
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
                        <label for="name" className="form-label">Dirección</label>
                        <input type="Textarea" required className="form-control" id="direccion" name="direccion" value={inmueble.direccion} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Tipo de Inmueble</label>
                        <input type="number" required className="form-control" id="tipoInmueble" name="tipoInmueble" value={inmueble.tipoInmueble} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Numero de Habitaciones</label>
                        <input type="number" required className="form-control" id="numHabitaciones" name="numHabitaciones" value={inmueble.numHabitaciones} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Numero de Baños</label>
                        <input type="number" required className="form-control" id="numBanios" name="numBanios" value={inmueble.numBanios} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Precio</label>
                        <input type="number" required className="form-control" id="precio" name="precio" value={inmueble.precio} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Empleado</label>
                        <select className="form-control" id="empleado" name="empleado" value={inmueble.empleado.nombre} onChange={handelInput} >
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
                <ShowInmueble />
            </div>
        </div>

    )
}

const ShowInmueble = () => {
    const showInmuebleApi = "http://localhost:8084/alcaldia/facturacion/inmueble/findAll";

    const [inmueble, setInmueble] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getInmueble();
    }, []);

    const getInmueble = () => {
        axios
            .get(showInmuebleApi)
            .then((res) => {
                console.log(res.data);
                setInmueble(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (inmueble.length < 0) {
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
                            <th>Direccion</th>
                            <th>Tipo de Inmueble</th>
                            <th>Numero de Habitaciones</th>
                            <th>Numero de Baños</th>
                            <th>Precio</th>
                            <th>Empleado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inmueble?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.tipoInmueble}</td>
                                    <td>{item.numHabitaciones}</td>
                                    <td>{item.numBanios}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.empleado.nombre}</td>
                                    <td>
                                        <Link to={`/edit-inmueble/${item.id}`}>
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

export default CreateInmueble