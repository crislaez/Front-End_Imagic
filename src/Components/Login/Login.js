import React, {useState} from 'react';
//css
import './Login.css';
//alertas
import swal from 'sweetalert';
//Services
import Services from '../../Services/Services';
//encrioptar clave
import md5 from 'crypto-js/md5'

function Login(props){

    const[correo, setCorreo] = useState('');
    const[clave, setClave] = useState('');

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        
        if(!correo){
            swal ( "Oops" , "Rellene el correo correctamente" , "error" );
        }else if(!clave){
            swal ( "Oops" , "Rellene la clave correctamente" , "error" );
        }else{
            let encryp = md5(clave);
            const data = new URLSearchParams(`correo=${correo}&clave=${JSON.stringify(encryp)}`);

            Services.login(data)
            .then(response => {
                console.log(response.data[0]);
                if(response.data[0]){
                    swal("Ok", "Registrado correctamente", "success");
                    localStorage.setItem('userNameImagic',response.data[0].nombre_usuario)
                    localStorage.setItem('userKeyImagic',response.data[0].id_usuario)
                    //cambiamos a la ventana de la web+
                    const funcionCambiarLogeadoAWeb = props.funcionCambiarLogeadoAWeb;
                    funcionCambiarLogeadoAWeb();
                }else{
                    swal ( "Oops" , "Correo o clave incorrectos" , "error" );
                }
            })
            .catch(err => console.log(err))
        }

        setCorreo('');
        setClave('');
    }

    return(
        <div>
            <div className='divVentanaPrincipalFoto'>

            </div>

            <div  className='componentePrincipal'>
                <div className='divTituiloLogin'>
                    <label>Imagic</label>
                </div>

                <form onSubmit={handleSubmitLogin} action='' method='' encType='multipart/form-data'>
                    <input type='email' name='email' value={correo} onChange={(params) => {setCorreo(params.target.value)}} placeholder='Correo electronico'></input>
                    <br></br>
                    <input type='password' value={clave} onChange={(params) => {setClave(params.target.value)}} placeholder='Contraseña'></input>
                    <br></br>
                    <input type='submit' value='Iniciar sesion'></input>
                </form>
            </div>

            <div className='componentePrincipalDown'>
                    <p>¿No tienes una cuenta? <label onClick={props.handleClickEnviarARegistro}>Regístrate</label></p>
            </div>
       </div>
    )
}

export default Login;