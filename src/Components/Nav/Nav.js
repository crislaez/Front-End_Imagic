import React, {useState, useEffect} from 'react';
//css
import './Nav.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'
import {faCompass, faHeart, faUser} from '@fortawesome/free-regular-svg-icons'
import {faBlogger} from '@fortawesome/free-brands-svg-icons'

function Nav(props){

    return(
        <nav>
            <label data-codigo='bMessage' type='button' onClick={props.funcionCambiarVentana}>
                <FontAwesomeIcon data-codigo='bMessage' icon={faLocationArrow}></FontAwesomeIcon>
            </label>

            <label data-codigo='bExplore' type='button' onClick={props.funcionCambiarVentana}>
                <FontAwesomeIcon data-codigo='bExplore' icon={faCompass}></FontAwesomeIcon>
            </label>

            <label data-codigo='bLike' type='button' onClick={props.funcionVentanaSolicitudes}>
                <FontAwesomeIcon data-codigo='bLike' icon={faHeart}></FontAwesomeIcon>
            </label>

            <label data-codigo='bPerfil' type='button' onClick={props.funcionCambiarVentana}>
                <FontAwesomeIcon data-codigo='bPerfil' icon={faUser}></FontAwesomeIcon>
            </label>
        </nav>
    )
}

export default Nav;