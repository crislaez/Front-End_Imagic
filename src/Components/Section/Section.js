import React, {useState, useEffect} from 'react';
//css
import './Section.css';
//components
import Perfil from '../Perfil/Perfil';
import Solicitudes from '../Solicitudes/Solicitudes';

function Section(props){

    return(
        <section>
            {
                props.ventana === 'bMessage'
                ?
                    <h2>PrimerBoton</h2>
                :
                props.ventana === 'bExplore'
                ?
                    <h2>Segundo boton</h2>
                :
                props.ventana === 'bPerfil'
                ?
                   <Perfil></Perfil>
                :
                <div style={{display:'none'}}></div>
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