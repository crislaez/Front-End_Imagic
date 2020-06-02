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
import Comentario from '../Comentario/Comentario'
//alertas
import swal from 'sweetalert';

function Perfil(props){

    const [isMount, setIsMount] = useState(false); 

    const [ventanaComentario, setVentanaComentario] = useState(false);
    const [codigoImagen, setCodigoImagen] = useState('');
    const [colorBotonSeguir, setColorBotonSeguir] = useState(false)


    useEffect(() =>{
        setIsMount(true);
        funcionComprobarSegumiento();

        return () => {
            setIsMount(false);
        }
    },[]);

    const funcionComprobarSegumiento = () => {
        console.log(props.arrayUsuario.id_usuario+'usuario invitado')
        console.log(localStorage.getItem('userKeyImagic'))
        Services.checkFollow(props.arrayUsuario.id_usuario ,localStorage.getItem('userKeyImagic'))
        .then(response => {
            console.log(response)
        })
    }

    const handleClickComponenteComentario = (event) => {
 
       if(ventanaComentario){
            document.body.style.overflow = 'scroll'
       }else{        
            // window.scroll(0, 0);
            document.body.style.overflow = 'hidden'
       }
       setVentanaComentario(!ventanaComentario);
       setCodigoImagen(event.target.dataset.codigo)
    };
    
    const handleClickSeguir = (event) => {
        // console.log(event.target.dataset.codigousuario)
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
            } else {
              swal("Your imaginary file is safe!");
            }
          });
            
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
        }
        
    }
    // console.log(props.arrayFotos);
    // console.log(props.arrayUsuario.id_usuario)

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
                        <input data-codigousuario={props.arrayUsuario.id_usuario} type='button' value='Dejar de seguir' style={{background:'#FAFAFA', color:'black'}} onClick={handleClickDejarSeguir}></input>
                    }
                        
                    </div>
                    
                    <div className='divBotonEngranaje'>
                    {
                        props.mostratUSuariOVisitante
                        ?
                        <label><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></label>
                        :
                        // <input type='button' value='Enviar mensaje' style={{background:'#3DA1F1', color:'white'}}></input>
                        <div style={{display:'none'}}></div>
                    }
                        
                    </div>

                    <div className='divDatosSeguidores'>
                        <p>0 publicaciones</p>
                        <p>0 seguidores</p>
                        <p>0 seguidores</p>
                    </div>

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
                <Comentario funcionBuscarUsuarios={props.funcionBuscarUsuarios} handleClickComponenteComentario={handleClickComponenteComentario} codigoImagen={codigoImagen} avatar={props.arrayUsuario.avatar} nombre_usuario={props.arrayUsuario.nombre_usuario}></Comentario>
                :
                <div style={{display:'none'}}></div>
            }

        </article>
    )
}

export default Perfil;