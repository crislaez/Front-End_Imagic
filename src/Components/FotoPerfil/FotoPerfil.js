import React from 'react';
//css
import './FotoPerfil.css'

function FotoPerfil(props){
    
    return(
        <div data-codigo={props.id_foto} data-codusuario={props.id_usuario} className='contenedorFotoUsuario' onClick={props.handleClickComponenteComentario}>
            <img data-codigo={props.id_foto} src={props.foto} alt={props.foto}></img>
        </div>
    )

}

export default FotoPerfil;