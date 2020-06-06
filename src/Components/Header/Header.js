import React, {useState} from 'react';
//css
import './Header.css';
//components
import Nav from '../Nav/Nav';
import DivBuscador from '../DivBuscador/DivBuscador'
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBlogger} from '@fortawesome/free-brands-svg-icons'
// import contexto from '../../Context/Context';
//Services
import Services from '../../Services/Services';
//alertas
import swal from 'sweetalert';

function Header(props){

    const [fieldSearch, setFieldSearch] = useState('');
    const [aparecerDivBuscardor, setAparecerDivBuscador] = useState(false);
    const [arrayUsuariosBuscados, setArrayUsuariosBuscados] = useState([]);

    const handleSubmitSeach = (event) => {
        event.preventDefault();

        Services.getUserByUserName(fieldSearch)
        .then(response => {
            if(response.data.toString()){
                // console.log(response.data)
                setArrayUsuariosBuscados(response.data)
                setAparecerDivBuscador(true);
                //funcion que esta en app para buscar el usuario
                // const funcionBuscarUsuario = props.funcionBuscarUsuario;
                // funcionBuscarUsuario(fieldSearch);
            }else{
                swal ( "Oops" , "No se a encontrado usuarios" , "error" );
                setAparecerDivBuscador(false);
            }            
        })
        setFieldSearch('')
    };

    const funcionRecargar = () => {
        window.location.reload(true);
    };

    const funcionCerrarVentanaDivBuscador = () => {
        setAparecerDivBuscador(false)
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
            {
                aparecerDivBuscardor
                ?
                <DivBuscador 
                arrayUsuariosBuscados={arrayUsuariosBuscados} 
                funcionBuscarUsuarios={props.funcionBuscarUsuarios}
                funcionCerrarVentanaDivBuscador={funcionCerrarVentanaDivBuscador}
                ></DivBuscador>
                :
                <div style={{display:'none'}}></div>
            }
            <Nav 
            funcionCambiarVentana={props.funcionCambiarVentana} 
            funcionVentanaSolicitudes={props.funcionVentanaSolicitudes}
            funcionVentanaSubirImagen={props.funcionVentanaSubirImagen}
            funcionBuscarUsuarios={props.funcionBuscarUsuarios}            
            ></Nav>
        </header>
    )
}

export default Header;