import React, {useState, useEffect} from 'react';
//css
import './Perfil.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons'
//Services
import Services from '../../Services/Services';
//components
import FotoPerfil from '../FotoPerfil/FotoPerfil';
import Comentario from '../Comentario/Comentario';
import DivPublicaciones from '../DivPublicaciones/DivPublicaciones';
import Engranaje from '../Engranaje/Engranaje';
//alertas
import swal from 'sweetalert';

function Perfil(props){

    const [isMount, setIsMount] = useState(false); 

    const [ventanaComentario, setVentanaComentario] = useState(false);
    const [codigoImagen, setCodigoImagen] = useState('');
    const [colorBotonSeguir, setColorBotonSeguir] = useState(false);
    const [aparecerDivEngranaje, setAparecerDivEngranaje] = useState(false);
 

    useEffect(() =>{
        setIsMount(true);
        //funcion que esta en section
        funcionComprobarSegumiento(props.arrayUsuario.id_usuario);   
        return () => {
            setIsMount(false);
        }
    //se renderizara cada vez que se actualice la prop del indice del usaurio al que veamos el perfil
    },[props.arrayUsuario.id_usuario]);


    //funcion que comprobara si el usuario logueado sigue al usuario del que busca en el perfil
    const funcionComprobarSegumiento = (indiceNuevoUsuario) => {          
        Services.checkFollow(indiceNuevoUsuario ,localStorage.getItem('userKeyImagic'))
        .then(response => {
            if(response.data.toString()){
                // console.log('le sigues')
                setColorBotonSeguir(true)
            }else{
                // console.log('NO le sigues')
                setColorBotonSeguir(false)
            }
        })        
    };

    const handleClickComponenteComentario = (event) => { 
       if(ventanaComentario){
            document.body.style.overflow = 'scroll'
       }else{        
            document.body.style.overflow = 'hidden'
       }
       setVentanaComentario(!ventanaComentario);
       setCodigoImagen(event.target.dataset.codigo)
    };
    
    const handleClickSeguir = (event) => {
        if(localStorage.getItem('userKeyImagic')){
            let data = new URLSearchParams(`id_seguir=${''}&id_usuario_seguido=${event.target.dataset.codigousuario}&id_usuario_seguidor=${localStorage.getItem('userKeyImagic')}`);

            Services.addFollow(data)
            .then(response => {
                if(response.success){
                    console.log(response.success)
                    swal("Ok", "Ahora le sigues", "success");
                    setColorBotonSeguir(true);
                }                
            });            
            
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
            window.location.reload(true);
        }        
    };

    const handleClickDejarSeguir = (event) => {
        let id = event.target.dataset.codigousuario
        console.log(event.target.dataset.codigousuario)
        if(localStorage.getItem('userKeyImagic')){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let data = new URLSearchParams(`id_usuario_seguido=${id}&id_usuario_seguidor=${localStorage.getItem('userKeyImagic')}`);
            
                Services.deleteFollow(data)
                .then(response => {
                    if(response.success){
                        console.log(response.success)
                        swal("Ok", "Ya no le sigues", "success");
                        setColorBotonSeguir(false);
                    }                
                });
                swal("Ok", "Ya no le sigues", "success");
            }
          });
            
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
        }        
    };
    // funcionUsuarioChat

    const handleClickChat = () => {        
        const funcionUsuarioChat = props.funcionUsuarioChat
        funcionUsuarioChat(props.arrayUsuario.id_usuario);
    };

    //funcion que hara aparecer la ventana engranaje para cerrar sesion
    const handleClickEngranaje = () => {
        setAparecerDivEngranaje(!aparecerDivEngranaje);
    }

    return(
        <article className='articlePerfil'>

            <div className='cabeceraPerfil'>
                <div className='divFotoPerfil'>
                    <img src={props.arrayUsuario.avatar} alt={props.arrayUsuario.avatar}></img>
                </div>

                <div className='divDatosUsuariosPerfil'>
                    <div className='divNombreUsuarioPerfil'>
                        <h3>{props.arrayUsuario.nombre_usuario}</h3>
                    </div>
                    
                    {
                        aparecerDivEngranaje
                        ?
                        <Engranaje handleClickEngranaje={handleClickEngranaje}></Engranaje>
                        :
                        <div style={{display:'none'}}></div>
                    }
                    

                    <div className='divBotonEditar'>
                    {
                        
                        props.mostratUSuariOVisitante
                        ?
                        <input type='button' value='Editar perfil'></input>
                        :
                        !props.mostratUSuariOVisitante && !colorBotonSeguir
                        ?
                        <input data-codigousuario={props.arrayUsuario.id_usuario} type='button' value='Seguir' style={{background:'#3DA1F1', color:'white'}} onClick={handleClickSeguir}></input>
                        :
                        <div className='divBotonesDejarSeguirYEnviarMensaje'>
                            <input data-codigousuario={props.arrayUsuario.id_usuario} type='button' value='Dejar de seguir' style={{background:'#FAFAFA', color:'black'}} onClick={handleClickDejarSeguir}></input>
                            <input data-codigo='bChat' type='button' onClick={handleClickChat} value='Enviar mensaje' style={{background:'#3DA1F1', color:'white'}}></input>
                        </div>                        
                    }
                        
                    </div>
                    
                    <div className='divBotonEngranaje'>
                    {
                        props.mostratUSuariOVisitante
                        ?
                        <label onClick={handleClickEngranaje}><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></label>
                        :
                        <div style={{display:'none'}}></div>
                    }
                        
                    </div>
               
                    <DivPublicaciones id_usuario={props.arrayUsuario.id_usuario}></DivPublicaciones>                                   

                    <div className='divNombreUsuario'>
                        <p><strong>{props.arrayUsuario.nombre_completo}</strong></p>
                    </div>
                </div>
            </div>

            <div className='contenedorPerfil'>

            {
                isMount && props.arrayFotos.toString()
                ?
                props.arrayFotos.map( (dato, key) => {
                    return(
                         <FotoPerfil key={key} id_foto={dato.id_foto} id_usuario={dato.id_usuario} foto={dato.foto} handleClickComponenteComentario={handleClickComponenteComentario}></FotoPerfil>
                    )
                })
                :
                <div>No hay fotos</div>
            }

            </div>

            {
                ventanaComentario
                ?
                <Comentario 
                funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                handleClickComponenteComentario={handleClickComponenteComentario} 
                codigoImagen={codigoImagen} avatar={props.arrayUsuario.avatar} 
                nombre_usuario={props.arrayUsuario.nombre_usuario} 
                ></Comentario>
                :
                <div style={{display:'none'}}></div>
            }

        </article>
    )
}

export default Perfil;