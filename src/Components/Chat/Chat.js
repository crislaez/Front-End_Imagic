import React, {useState, useEffect} from 'react';
//css
import './Chat.css';
//Services
import Services from '../../Services/Services';
//alertas
import swal from 'sweetalert';

function Chat(props){

    const [isMount, setIsMount] = useState(false);
    const [arrayUsuarios, setArrayUIsuarios] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState('');
    const [mensajeChat, setMensajeChat] = useState('');
    const [mensajesDelChat, setMensajesDelChat] = useState([]);
    let tiempo;


    useEffect(() => {
        setIsMount(true);
        //para el panel de la derecha, cargar todos lso usuarios a lso que seguimos
        funcionDatosUsuariosSeguidos();
        //para conseguir los datos del usuario con quien vamos a chatear
        funcionDatosUsuarioChatear(props.idUsuarioChat);
        //funcion para consegfuir todos los mensajes de lso 2 usuarios
        funcionObtenerMensajesChat(props.idUsuarioChat)
        tiempo = intervalo(props.idUsuarioChat);

        return () => {
            setIsMount(false);
            clearInterval(tiempo);
        }
        
    }, [props.idUsuarioChat]);
    
    const intervalo = (id) => {
        let tiempo = setInterval( () => {
            funcionObtenerMensajesChat(id)
            console.log('ejecutando')
        },1000)
    
        return tiempo;
    }

    //para conseguir los datos del usuario con quien vamos a chatear
    const funcionDatosUsuarioChatear = (id) => {
        Services.getUserById(id)
        .then(response => {
            // console.log(response.data[0]);
            setDatosUsuario(response.data[0])
        })
        .catch(err => console.log(err))
    }

    //funcion para consegfuir todos los mensajes de lso 2 usuarios
    const funcionObtenerMensajesChat = (id) => {
        Services.getChatByUsers(parseInt(localStorage.getItem('userKeyImagic')), parseInt(id))
        .then(response => {
            console.log(response.data)
            setMensajesDelChat(response.data)
        })
    }
 
    //funcion que hace fetch para comprobar todos los usuarios a los que les sigue el que a echo login
    const funcionDatosUsuariosSeguidos = () => {
        if(localStorage.getItem('userKeyImagic')){
            Services.addFollowByIdUser(localStorage.getItem('userKeyImagic'))
            .then(response => {
                setArrayUIsuarios(response.data)
            })
            .catch(err => console.log(err))
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
            window.location.reload(true);
        }        
    };

    const handleClickChat = (event) => {
        //llamamos a la funcion que esta en app
        const funcionUsuarioChat = props.funcionUsuarioChat
        funcionUsuarioChat(event.target.dataset.codigo)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(localStorage.getItem('userKeyImagic')){
            if(!mensajeChat){
                swal ( "Oops" , "Rellena el mensaje" , "error" );
            }else{
                let data = new URLSearchParams(`id_chat=${''}&id_usuario_uno=${parseInt(localStorage.getItem('userKeyImagic'))}&id_usuario_dos=${parseInt(props.idUsuarioChat)}&mensaje=${mensajeChat}`)
                Services.addChat(data)
                .then(response => {
                    if(response.success){
                        //funcion para consegfuir todos los mensajes de lso 2 usuarios
                        funcionObtenerMensajesChat(props.idUsuarioChat)
                    }
                })
                .catch(err => console.log(err))
            }
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
            window.location.reload(true)
        }
        setMensajeChat('');
    }

    // console.log(props.idUsuarioChat);

    return(
        <article className='divChat'>

            <div className='divLeft'>
                <div className='divDirect'>
                    <p>Direct</p>
                </div>

                <div className='divUsuarios'>
                     {
                        isMount && arrayUsuarios.toString()
                        ?
                        arrayUsuarios.map( (dato, key) => {                                                        
                            return(
                                <div key={key} className='divUsuariosChat' >
                                    <div className='divImagenUsuariosChat'>
                                        <img src={dato.avatar} alt={dato.avatar}></img>
                                    </div>
                                    <div className='divParrafoUsuarios'>
                                        <label data-codigo={dato.id_usuario} onClick={handleClickChat}>{dato.nombre_usuario}</label>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div style={{display:'none'}}></div>
                     }
                </div>
            </div>

            <div className='divRight'>
                <div className='divDirect'>
                    <div className='divUsuarioChatearImagen'>
                        <img src={datosUsuario.avatar} alt={datosUsuario.avatar}></img>
                    </div>
                    <div className='divUsuarioChatearNombre'>
                        <label>{datosUsuario.nombre_usuario}</label>
                    </div>
                </div>

                <div className='divUsuarios'>
                     <div className='contenedorChat'>
                        {
                            isMount && mensajesDelChat
                            ?
                            mensajesDelChat.map( (dato, key) => {
                                let flotar,background,imagen,aparecerImagen;
                                if(dato.id_usuario_uno == parseInt(localStorage.getItem('userKeyImagic'))){
                                    flotar = 'right';
                                    background = '#ECECEC';
                                    imagen = '';
                                    aparecerImagen= 'none';
                                    
                                }else{
                                    flotar = 'left';
                                    background = 'white';
                                    imagen = datosUsuario.avatar;
                                    aparecerImagen= 'block';
                                    
                                }
                                return(
                                    <div key={key} className='divCajaMensaje' style={{float:`${flotar}`}}>
                                        <div className='divImagenChat' data-codigoenviado={dato.id_usuario_uno} data-codigorecibido={dato.id_usuario_dos} style={{display:aparecerImagen}}>
                                            <img src={imagen} alt={imagen}></img>
                                        </div>
                                        <div className='divMensaje' style={{background:`${background}`}}>
                                            <p>{dato.mensaje}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div>cargando...</div>

                        }
                     </div>
                     
                     <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                        <input type='text' value={mensajeChat} onChange={(params) => {setMensajeChat(params.target.value)}} placeholder='Enviar mensaje...'></input>
                        <input type='submit' value='Enviar'></input>
                     </form>
                </div>
            </div>
        </article>
    )
}

export default Chat;

// swal("Ok", "Foto subida correctamente", "success");