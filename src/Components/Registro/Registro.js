import React, {useState, useEffect} from 'react';
//css
import './Registro.css';
//alertas
import swal from 'sweetalert';
//Services
import Services from '../../Services/Services';
import md5 from 'crypto-js/md5'

function Registro(props){   

    const [nombre_completo, setNombre_Completo] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [nombre_usuario, setNombre_Usuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        
        return () => {

        }
    },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if(!nombre_completo || !/[A-Za-z]+$/.test(nombre_completo)){
            swal ( "Oops" , "Rellene el nombre completo correctamente" , "error" );
        }
        else if(!nacimiento){
            swal ( "Oops" , "Rellene la fecha correctamente" , "error" );
        }
        else if(!nombre_usuario){
            swal ( "Oops" , "Rellene el nombre de usuario correctamente" , "error" );
        }
        else if(!correo){
            swal ( "Oops" , "Rellene el correo correctamente" , "error" );
        }
        else if(!clave){
            swal ( "Oops" , "Rellene la clave correctamente" , "error" );
        }
        else if(!avatar){
            swal ( "Oops" , "Rellene el avatar correctamente" , "error" );
        }else{
            console.log(nombre_completo);
            console.log(nacimiento);
            console.log(nombre_usuario);
            console.log(correo);
            let encript = md5(clave);
            console.log(encript);
            console.log(avatar);
            
            let formData = new FormData();
            formData.append('id_usuario','');
            formData.append('nombre_completo',nombre_completo);
            formData.append('nacimiento',nacimiento);
            formData.append('nombre_usuario',nombre_usuario);
            formData.append('correo',correo);
            formData.append('clave',encript);
            formData.append('avatar',avatar);

            //hacemos un fetch parea enviar los datos del formulario a back
            Services.addUser(formData)
            .then(response => {
                if(response.success){
                    swal("Ok", "Registrado correctamente", "success");
                    //llamamos a la funcion que esta en ventanaPrincipal para cambiar a la ventana de login
                    const handleClickEnviarARegistro = props.handleClickEnviarARegistro;
                    handleClickEnviarARegistro();
                }else{
                    swal ( "Oops" , "Ha ocurrido un eror" , "error" );
                }
            })
            .catch(err => console.log(err));
        }
        //limpiamos los campos
        setNombre_Completo('');
        setNacimiento('');
        setNombre_Usuario('');
        setCorreo('');
        setClave('');
        setAvatar('');
    }


    return(
        <div>
            <div className='componentePrincipalRegistro'>

                <div className='divTutiloRegistro'>
                    <h2>Imagic</h2>
                    <p>Regístrate para ver fotos y videos de tus amigos.</p>
                    <hr></hr>
                </div>
                

                <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data' >
                    <input type='text' name='nombre' value={nombre_completo} onChange={(params) => {setNombre_Completo(params.target.value)}} placeholder='Nombre completo'></input>
                    <br></br>
                    <input type='date' value={nacimiento} onChange={(params) => {setNacimiento(params.target.value)}} placeholder='nacimiento'></input>
                    <br></br>
                    <input type='text' name='nombreUsuario' value={nombre_usuario} onChange={(params) => {setNombre_Usuario(params.target.value)}} placeholder='Nombre de usuario'></input>
                    <br></br>
                    <input type='email' name='email' value={correo} onChange={(params) => {setCorreo(params.target.value)}} placeholder='Correo electronico'></input>
                    <br></br>
                    <input type='password' value={clave} onChange={(params) => {setClave(params.target.value)}} placeholder='Contraseña'></input>
                    <br></br>
                    <label>Avatar:</label><input type='file' onChange={(params) => {setAvatar(params.target.files[0])}}></input>
                    <br></br>
                    <input id='bEnviarRegistro' type='submit' value='Registrarse'></input>
                </form>

                <div className='divCoindiconesRegistro'>
                    Al registrarte, aceptas nuestras Condiciones. 
                    Obtén más información sobre cómo recopilamos, usamos y compartimos
                    tus datos en la Política de datos, así como el uso que hacemos de las 
                    cookies y tecnologías similares en la Política de cookies.
                </div>
            </div>           

            <div className='divContenedorDown'>
                <p>¿Tienes una cuenta? <label onClick={props.handleClickEnviarARegistro}>Entrar</label></p>
            </div>
        </div>
    )
}

export default Registro;