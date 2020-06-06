import React ,{useState} from 'react';
//css
import './VentanaPrincipal.css';
//components
import Login from '../Login/Login';
import Registro from '../Registro/Registro';

function VentanaPrincipal(props){
        
    const [ loginRegistro, setLoginRegistro] = useState(false);

    const handleClickEnviarARegistro = () => {
        setLoginRegistro(!loginRegistro)
    }

    return(
        <div className='ventanaPrincipal'>
        {
            !loginRegistro
            ?
            <Login handleClickEnviarARegistro={handleClickEnviarARegistro} funcionCambiarLogeadoAWeb={props.funcionCambiarLogeadoAWeb}></Login>
            :
            <Registro handleClickEnviarARegistro={handleClickEnviarARegistro}></Registro>
        }        
        </div>
    )
}

export default VentanaPrincipal;

