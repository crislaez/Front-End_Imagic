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
    const [datosUsuario, setDatosUsuario] = useState('')


    useEffect(() => {
        setIsMount(true);

        funcionDatosUsuariosSeguidos();
        funcionDatosUsuarioChatear(props.idUsuarioChat);

        return () => {
            setIsMount(false);
        }
    }, [props.idUsuarioChat]);
    

    const funcionDatosUsuarioChatear = (id) => {
        Services.getUserById(id)
        .then(response => {
            console.log(response.data[0]);
            setDatosUsuario(response.data[0])
        })
        .catch(err => console.log(err))
    }
 
    //funcion que hace fetch para comprobar todos los usuarios a los que les sigue el que a echo login
    const funcionDatosUsuariosSeguidos = () => {
        if(localStorage.getItem('userKeyImagic')){

            Services.addFollowByIdUser(localStorage.getItem('userKeyImagic'))
            .then(response => {
                // console.log(response.data);
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
                                <div key={key} className='divUsuariosChat'>
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
                </div>
            </div>
        </article>
    )
}

export default Chat;