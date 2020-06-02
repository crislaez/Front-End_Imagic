import React, {useState, useEffect} from 'react';
//css
import './Section.css';
//components
import Perfil from '../Perfil/Perfil';
import Inicio from '../Inicio/Inicio';
import Solicitudes from '../Solicitudes/Solicitudes';
import SubirImagen from '../SubirImagen/SubirImagen'
// //Services
// import Services from '../../Services/Services';

function Section(props){


    useEffect( () => {

    },[])

    return(
        <section>
            {
                props.ventana === 'bMessage'
                ?
                    <Inicio 
                    funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                    ></Inicio>
                :
                props.ventana === 'bExplore'
                ?
                    <h2>Segundo boton</h2>
                :
                props.ventana === 'bPerfil'
                ?
                   <Perfil 
                   arrayFotos={props.arrayFotos} 
                   arrayUsuario={props.arrayUsuario}
                   funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                   mostratUSuariOVisitante={props.mostratUSuariOVisitante}
                   ></Perfil>
                :
                <div style={{display:'none'}}></div>
            }

            {
                props.ventanaSubirImagen
                ?
                <SubirImagen funcionVentanaSubirImagen={props.funcionVentanaSubirImagen} fetchFotosUsuario={props.fetchFotosUsuario}></SubirImagen>
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