import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import Loader from '../Common/Loader';
import './User.css';
import axios from "axios";





const CreateEmpleado = (props) => {
    const navigate = useNavigate();
    const createUserApi = "http://localhost:8084/api/alcaldia/catalogo/empleado/create"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {loggedIn, setLoggedIn}  = props;
    const [empleado, setUser] = useState({
        nombre: "",
        email: "",
        apellido: ""
    })

    useEffect(() => {
        if(!loggedIn){
            navigate("/login");
        }
      }, [loggedIn]);

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...empleado, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(empleado)
        try {
            setIsLoading(true);
            const response = await fetch(createUserApi, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8;',
                },
                body: JSON.stringify(empleado),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({ nombre: "", email: "", apellido: "" })
                navigate('/create-user');
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
                    <p>Registrar Empleado</p>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="nombre" name="nombre" value={empleado.nombre} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Apellido</label>
                        <input type="text" required className="form-control" id="apellido" name="apellido" value={empleado.apellido} onChange={handelInput} />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" required className="form-control" id="email" name="email" value={empleado.email} onChange={handelInput} />
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
            <div>
                <ShowEmpleados />
            </div>
        </div>

    )
}

const ShowEmpleados = () => {
    const showEmpleadoApi = "http://localhost:8084/api/alcaldia/catalogo/empleado/findAll";

    const [empleados, setEmpleado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get(showEmpleadoApi)
            .then((res) => {
                setEmpleado(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (empleados.length < 0) {
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
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link to={`/edit-user/${item.id}`}>
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

export default CreateEmpleado