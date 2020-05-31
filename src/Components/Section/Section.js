import React, {useState, useEffect} from 'react';
//css
import './Section.css';
//components
import Perfil from '../Perfil/Perfil';
import Inicio from '../Inicio/Inicio';
import Solicitudes from '../Solicitudes/Solicitudes';
import SubirImagen from '../SubirImagen/SubirImagen'
//Services
import Services from '../../Services/Services';

function Section(props){

    const [arrayFotos, setArrayFotos] = useState([]); 

    useEffect( () => {
        fetchFotosUsuario()
    },[])

    const fetchFotosUsuario = () => {
        Services.getImagenesById(localStorage.getItem('userKeyImagic'))
        .then(response => {
            setArrayFotos(response.data)
        })
        .catch(err => console.log(err));
    }

    return(
        <section>
            {
                props.ventana === 'bMessage'
                ?
                    <Inicio></Inicio>
                :
                props.ventana === 'bExplore'
                ?
                    <h2>Segundo boton</h2>
                :
                props.ventana === 'bPerfil'
                ?
                   <Perfil arrayFotos={arrayFotos}></Perfil>
                :
                <div style={{display:'none'}}></div>
            }

            {
                props.ventanaSubirImagen
                ?
                <SubirImagen funcionVentanaSubirImagen={props.funcionVentanaSubirImagen} fetchFotosUsuario={fetchFotosUsuario}></SubirImagen>
                :
                <div styile={{display:'none'}}></div>
            }

            {
                props.ventanaSolidcitudes
                ?
                <Solicitudes></Solicitudes>
                :
                <div styile={{display:'none'}}></div>
            }
            
        </section>
    )
}

export default Section;