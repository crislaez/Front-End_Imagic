import React from 'react';
//css
import './Nav.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationArrow ,faFileUpload} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faUser} from '@fortawesome/free-regular-svg-icons'
// import {faBlogger} from '@fortawesome/free-brands-svg-icons'

function Nav(props){

    const cambioPerfil = (event) => {
        const funcionCambiarVentana = props.funcionCambiarVentana
        funcionCambiarVentana(event);
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(localStorage.getItem('userKeyImagic'))
    }
    return(
        <nav>
            <label data-codigo='bMessage' type='button' onClick={props.funcionCambiarVentana}>
                <FontAwesomeIcon data-codigo='bMessage' icon={faLocationArrow}></FontAwesomeIcon>
            </label>

            <label data-codigo='bExplore' type='button' onClick={props.funcionVentanaSubirImagen}>
                <FontAwesomeIcon data-codigo='bExplore' icon={faFileUpload}></FontAwesomeIcon>
            </label>

            <label data-codigo='bLike' type='button' onClick={props.funcionVentanaSolicitudes}>
                <FontAwesomeIcon data-codigo='bLike' icon={faHeart}></FontAwesomeIcon>
            </label>

            <label data-codigo='bPerfil' type='button' onClick={cambioPerfil}>
                <FontAwesomeIcon data-codigo='bPerfil' icon={faUser}></FontAwesomeIcon>
            </label>
        </nav>
    )
}

export default Nav;