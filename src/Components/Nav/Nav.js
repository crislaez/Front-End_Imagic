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
            <label id='bMessage' type='button'>
                <FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
            </label>

            <label id='bExplore' type='button'>
                <FontAwesomeIcon icon={faCompass}></FontAwesomeIcon>
            </label>

            <label id='bLike' type='button'>
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </label>

            <label id='bPerfil' type='button'>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </label>
        </nav>
    )
}

export default Nav;