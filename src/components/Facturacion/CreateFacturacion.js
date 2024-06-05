import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import Loader from '../Common/Loader';
import './User.css';
import axios from "axios";





const CreateFacturacion = (props) => {
    const navigate = useNavigate();
    const getAllPropietariosApi = "http://localhost:8084/api/alcaldia/catalogo/propietario/findAll"
    const getAllInmueblesApi = "http://localhost:8084/api/alcaldia/facturacion/inmueble/findAllWithoutFacturacion"
    const createFacturacionApi = "http://localhost:8084/api/alcaldia/facturacion/create"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {loggedIn, setLoggedIn}  = props;

    useEffect(() => {
        if(!loggedIn){
            navigate("/login");
        }
      }, [loggedIn]);

    let showPropi, showInmu;

    const [propietarios, setPropietarios] = useState([{
        id: "",
        tipoDocumento: "",
        documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
    }]);

    const [propietario, setPropietario] = useState(null);

    const [inmueble, setInmueble] = useState(null)

    const [inmuebles, setInmuebles] = useState([{
        id: "",
        claveCatastral: "",
        direccion: "",
        tipoInmueble: "",
        numHabitaciones: "",
        numBanios: "",
        precio: ""
    }])

    const [facturacion, setFacturacion] = useState([{
        inmueble: "",
        propietario: "",
        montoFacturacion: ""
    }]);

    useEffect(() => {
        getInmuebles();
        getPropietarios();
    }, []);

    const getInmuebles = () => {
        axios
            .get(getAllInmueblesApi)
            .then((res) => {
                console.log(res.data);
                setInmuebles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPropietarios = () => {
        axios.get(getAllPropietariosApi).then((res) => {
            console.log(res.data);
            setPropietarios(res.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    const handelInput = (event) => {
        event.preventDefault();
        let pr = null;
        let inm = null;
        let { name, value } = event.target;

        if (name === 'propietario' && (value != undefined || value != null || value != '')) {
            for (let i = 0; i < propietarios.length; i++) {
                if (propietarios[i].id == value) {
                    pr = propietarios[i];
                }
            }

            setPropietario(pr);
        }

        if (name === 'inmueble' && (value != undefined || value != null || value != '')) {
            for (let i = 0; i < inmuebles.length; i++) {
                if (inmuebles[i].id == value) {
                    inm = inmuebles[i];
                }
            }
            setInmueble(inm);
        } 

       

        setFacturacion({ ...facturacion, [name]: value });
    }



    const handelSubmit = async (event) => {
        event.preventDefault();
        facturacion.inmueble = { "id": facturacion.inmueble}
        facturacion.propietario = { "id": facturacion.propietario}

        console.log(facturacion)
        try {
            setIsLoading(true);
            const response = await fetch(createFacturacionApi, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8;',
                },
                body: JSON.stringify(facturacion),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setFacturacion({
                    inmueble: "",
                    propietario: "",
                    montoFacturacion: ""
                })
                navigate('/create-facturacion');
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
                    <p>Facturar</p>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Monto</label>
                        <input type="number" required className="form-control" id="montoFacturacion" name="montoFacturacion" value={facturacion.montoFacturacion} onChange={handelInput} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Propietario</label>
                        <select className="form-control" id="propietario" name="propietario" value={facturacion.propietario} onChange={handelInput} >
                            <option selected ></option>
                            {propietarios.map((data, i) => (
                                <option key={i} value={data.id}>
                                    {data.documento}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Inmueble</label>
                        <select className="form-control" id="inmueble" name="inmueble" value={facturacion.inmueble} onChange={handelInput} >
                            <option selected ></option>
                            {inmuebles.map((data, i) => (
                                <option key={i} value={data.id}>
                                    {data.claveCatastral}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
            <div>
            <ShowPropietario propietario={propietario} ></ShowPropietario>              
            <ShowInmueble inmueble={inmueble} ></ShowInmueble>
            </div>
        </div>
    )
}


const ShowPropietario = (p) => {
    console.log("ShowPropietario tag");
    console.log(p);
    if (p.propietario == null) {
        return <div></div>;
    } else {
        return (
            <div className="mt-5">
                <div className='heading'>
                    <p>Datos del Propietario</p>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Tipo Documento</th>
                            <th>documento</th>
                            <th>nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{p.propietario.tipoDocumento}</td>
                            <td>{p.propietario.documento}</td>
                            <td>{p.propietario.nombre}</td>
                            <td>{p.propietario.apellido}</td>
                            <td>{p.propietario.telefono}</td>
                            <td>{p.propietario.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};


const ShowInmueble = (i) => {
    console.log("inmueble tag");
    console.log(i);
    if (i.inmueble == null) {
        return <div></div>;
    } else {
        return (
            <div className="mt-5">
                <div className='heading'>
                    <p>Datos del Inmueble</p>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Clave Catastral</th>
                            <th>Dirección</th>
                            <th>Tipo Inmueble</th>
                            <th>Numero de Habitaciones</th>
                            <th>Numero de Baños</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{i.inmueble.claveCatastral}</td>
                            <td>{i.inmueble.direccion}</td>
                            <td>{i.inmueble.tipoInmueble}</td>
                            <td>{i.inmueble.numHabitaciones}</td>
                            <td>{i.inmueble.numBanios}</td>
                            <td>{i.inmueble.precio}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};


export default CreateFacturacion