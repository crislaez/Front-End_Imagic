import React ,{useState, useEffect,useContext} from 'react';
//css
import './VentanaPrincipal.css';
//components
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
// import ArrayExportado from '../../Context/Context';

function VentanaPrincipal(props){
    // const context = useContext(ArrayExportado);
    
    const [ loginRegistro, setLoginRegistro] = useState(false);

    const handleClickEnviarARegistro = () => {
        setLoginRegistro(!loginRegistro)
    }

    return(
        <div className='ventanaPrincipal'>
        {
            !loginRegistro
            ?
            <Login handleClickEnviarARegistro={handleClickEnviarARegistro}></Login>
            :
            <Registro handleClickEnviarARegistro={handleClickEnviarARegistro}></Registro>
        }        
        </div>
    )
}

export default VentanaPrincipal;

