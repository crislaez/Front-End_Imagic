import React,{useState, useEffect} from 'react';
//css
import './ComentarioIndividual.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
//alertas
import swal from 'sweetalert';
//Services
import Services from '../../Services/Services';

function ComentarioIndividual(props){
    
    const handleClickBorrarMensaje = (event) => {
        // console.log(event.target)
        let codigo = event.target.dataset.codigo
        console.log(codigo)
        if(codigo){
            swal({
                title: "Estas seguro?",
                text: "Seguro que quieres borrar el comentario?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                Services.deleteComent(codigo)
                .then(response => {
                    console.log(response)
                    //activamos la funcion que esta en comentario para cargar todos los comentarios
                    const fetchComentariosIdFoto = props.fetchComentariosIdFoto;
                    fetchComentariosIdFoto();
                })
                swal("Ok", "Mensaje borrado", "success");
                // window.location.reload(true)
            }
          });
        }        
    };

    const handleClickIrAPerfil = (event) => {
        //llamamos a la funcion que esta en section para qeu cambia el componente perfil coim el usuario al que hemos hecho click
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.parentNode.parentNode.dataset.codigousuario);
        //y llamamos a la funcion que esta en perfil para cerrar esta ventana
        const handleClickComponenteComentario = props.handleClickComponenteComentario;
        handleClickComponenteComentario(event);
    };

    return(
        <div className='textoComentario' data-codigo={props.id_comentario} data-codigousuario={props.id_usuario}>
            <div className='divimagenComentario'>
                <img src={props.avatar} alt={props.avatar}></img>
            </div>
            <div className='divParrafoTexto'>
                <label onClick={handleClickIrAPerfil}>{props.nombre_usuario}:</label>
                <p>{props.texto_comentario}</p>
            </div>           
            <div data-codigo={props.id_comentario} className='divElipse'>
                <label data-codigo={props.id_comentario} onClick={handleClickBorrarMensaje}><FontAwesomeIcon data-codigo={props.id_comentario} icon={faEllipsisH}></FontAwesomeIcon></label>
            </div>                         
        </div>
    )
}

export default ComentarioIndividual;