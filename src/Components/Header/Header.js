import React, {useState, useEffect, useContext} from 'react';
//css
import './Header.css';
//components
import Nav from '../Nav/Nav';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBlogger} from '@fortawesome/free-brands-svg-icons'
// import contexto from '../../Context/Context';

function Header(props){

    const [fieldSearch, setFieldSearch] = useState('');

    const handleSubmitSeach = (event) => {
        event.preventDefault();
        console.log(fieldSearch);

        setFieldSearch('')
    }

    const funcionRecargar = () => {
        // console.log('click')
        window.location.reload(true);
    }

    return(
        <header>
            <div className='hDivLogo'>
                <label onClick={funcionRecargar}>
                    <FontAwesomeIcon icon={faBlogger}></FontAwesomeIcon>
                    |
                    Imagic
                </label>         
            </div>

            <form onSubmit={handleSubmitSeach} action='' method='' encType='multipart/form-data'>
                <input type='search' name='search' value={fieldSearch} onChange={(params) => {setFieldSearch(params.target.value)}} placeholder='Buscar'></input>
            </form>

            <Nav 
            funcionCambiarVentana={props.funcionCambiarVentana} 
            funcionVentanaSolicitudes={props.funcionVentanaSolicitudes}
            funcionVentanaSubirImagen={props.funcionVentanaSubirImagen}
            ></Nav>
        </header>
    )
}

export default Header;