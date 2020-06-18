import React, {useState, useEffect} from 'react';
//css
import './Historial.css';
//Services
import Services from '../../Services/Services';
import { faDigitalTachograph } from '@fortawesome/free-solid-svg-icons';

function Historial(props){

    // const [arrayUsuariosSeguidos, setArrayUsuariosSeguidos] = useState([])

    useEffect( () => {

        // funcionDatosSeguidos()
        return() => {

        }
    },[])

    // const funcionDatosSeguidos = () => {
    //     // addFollowByIdUser
    //     Services.addFollowByIdUser(localStorage.getItem('userKeyImagic'))
    //     .then(response => {
    //         console.log(response.data);
    //         setArrayUsuariosSeguidos(response.data)
    //     })
    //     .catch(err => console.log(err))
    // };

    const handleClick = (event) => {
        //llamamos a la funcion que esta en app para que nos redirija al perfil
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.dataset.codigo)
    };

    return(
        <div className='divHistorial'>
            {
                props.arrayUsuariosSeguidos.map( (dato, key) => {
                   return(
                        <div key={key} className='divDatosHistorial'>
                            <div className='divImagenHistorial'>
                                <img src={dato.avatar} alt={dato.avatar}></img>
                            </div>
                            <p onClick={handleClick} data-codigo={dato.id_usuario_seguido}>{dato.nombre_usuario}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Historial;