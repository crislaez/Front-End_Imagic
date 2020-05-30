import React, {useState, useEffect} from 'react';
//css
import './Login.css';

function Login(props){

    return(
        <div>
            <div className='divVentanaPrincipalFoto'>
            </div>
            <form action='' method='' encType='multipart/form-data' className='componentePrincipal'>
            
            </form>

            <div className='componentePrincipalDown'>
                    <p>¿No tienes una cuenta? <label onClick={props.handleClickEnviarARegistro}>Regístrate</label></p>
            </div>
       </div>
    )
}

export default Login;