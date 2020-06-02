import React,{useState, useEffect} from 'react';
//css
import './FotoInicio.css';
//Services
import Services from '../../Services/Services';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
//alertas
import swal from 'sweetalert';

function FotoInicio(props){
    
    const [isMount, setIsMount] = useState(false); 
    const [mensaje, setMensaje] = useState('');
    const [arrayComentario,setArrayComentario] = useState('');

    useEffect( () => {
        setIsMount(true);

        fetchComentariosIdFoto();

        return () => {
            setIsMount(false);
        }
    },[]);
    
    const fetchComentariosIdFoto = () => {
        Services.getComentByIdImagen(props.id_foto)
        .then(response => {
            console.log(response.data)
            setArrayComentario(response.data)
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(localStorage.getItem('userKeyImagic')){
            if(!mensaje){
                swal( "Oops","Rellena el mensaj","error" );
            }else{
                const data = new URLSearchParams(`id_comentario=${''}&id_foto=${props.id_foto}&id_usuario=${parseInt(localStorage.getItem('userKeyImagic'))}&texto_comentario=${mensaje}`);
                Services.addComent(data)
                .then(response => {
                    console.log(response)
                    if(response.success){
                        swal("Ok", "Foto subida correctamente", "success");
                        fetchComentariosIdFoto();
                    }
                })           
                .catch(err => console.log(err)) 
                
            }
        }else{
            swal( "Oops","Debes estar logueado","error" );
        }
        setMensaje('');
    }

    const handleClickIrAPerfil = (event) => {
        // console.log(event.target.parentNode.dataset.codigousuario)
        //llamamos a la funcion que esta en section para qeu cambia el componente perfil coim el usuario al que hemos hecho click
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.parentNode.dataset.codigousuario);
       
    }
console.log(arrayComentario)
    return(
        <div className='divFotosInicio' data-codigo={props.id_foto} data-codigousuario={props.id_usuario}>
                                
            <div className='divUsuario' data-codigousuario={props.id_usuario}>
                <div className='divFotoPrincipalsuario'>
                    <img src={props.avatar} alt={props.avatar}></img>                                        
                </div>

                <h3 onClick={handleClickIrAPerfil}>{props.nombre_usuario}</h3>
            </div>

            <div className='divFotoUsuario'>
                <img src={props.foto} alt={props.foto}></img>
            </div>

            <div className='divComentarios'>
                <div className='divMeGusta'>
                    <label data-codigo={props.id_usuario} type='button' >
                        <FontAwesomeIcon data-codigo='bLike' icon={faHeart}></FontAwesomeIcon>
                    </label>
                </div>

                <div className='diCajaComentarioInicio'>

                    <div data-codigousuario={props.id_usuario} className='divComentarioInicio'>
                        <label onClick={handleClickIrAPerfil}>{props.nombre_usuario}:</label>
                        <p className='divComentarioInicioParrafo'>{props.texto_foto}</p>
                    </div>
                   
                {
                    isMount && arrayComentario.toString()
                    ?
                    arrayComentario.map( (dato, key) => {
                        return(
                            <div key={key} className='divComentarioInicio' data-codigousuario={dato.id_usuario}>
                                <label onClick={handleClickIrAPerfil}>{dato.nombre_usuario}:</label>
                                <p className='divComentarioInicioParrafo'>{dato.texto_comentario}</p>
                            </div>
                        )
                    })
                    :
                    <div style={{textAlign:'center'}}>No hay comentarios</div>
                }
                </div>

                <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                    <input type='text' value={mensaje} onChange={(params) => setMensaje(params.target.value)} placeholder='Agrega un comentario...'></input>
                    <input type='submit' value='Publicar'></input>
                </form>
            </div>            

        </div>

    )
}

export default FotoInicio;