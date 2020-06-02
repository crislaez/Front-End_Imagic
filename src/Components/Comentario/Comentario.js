import React, {useState, useEffect} from 'react';
//css
import './Comentario.css'
//Services
import Services from '../../Services/Services';
//alertas
import swal from 'sweetalert';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';

function Comentario(props){

    const [isMount, setIsMount] = useState(false); 
    const [arrayFoto, setArrayFoto] = useState([]);
    const [arrayComentario, setArrayComentario] = useState([]);
    const [textoComentario, setTextoComentario] = useState('');

    
    useEffect( () => {
        setIsMount(true);
        fetchFotoPorId();
        fetchComentariosIdFoto();
        
        return () => {
            setIsMount(false);
        }
    },[]);
    
    const fetchFotoPorId = () => {
        Services.getImagenByIdImagen(props.codigoImagen)
        .then(response => {
            console.log(response.data[0])
            setArrayFoto(response.data[0])
        })
    };
    
    const fetchComentariosIdFoto = () => {
        Services.getComentByIdImagen(props.codigoImagen)
        .then(response => {
            console.log(response)
            setArrayComentario(response.data)
        })
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();       

        if(localStorage.getItem('userKeyImagic')){
            if(!textoComentario){
                swal ( "Oops" , "Rellena un comentario" , "error" );
            }
            else{                
                const data = new URLSearchParams(`id_comentario=${''}&id_foto=${arrayFoto.id_foto}&id_usuario=${parseInt(localStorage.getItem('userKeyImagic'))}&texto_comentario=${textoComentario}`);
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
            swal ( "Oops" , "Debes estar logueado" , "error" );
        }

        setTextoComentario('');        
    };

    const handleClickIrAPerfil = (event) => {
        // console.log(event.target.parentNode.parentNode.dataset.codigousuario)
        //llamamos a la funcion que esta en section para qeu cambia el componente perfil coim el usuario al que hemos hecho click
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.parentNode.parentNode.dataset.codigousuario);
        //y llamamos a la funcion que esta en perfil para cerrar esta ventana
        const handleClickComponenteComentario = props.handleClickComponenteComentario;
        handleClickComponenteComentario(event);
    }
    // console.log(arrayFoto.foto);
    // console.log(props.codigoImagen)
    console.log(arrayComentario)
    return(
        <div className='divComentario' >
            <div className='botonAtras'>
                <input type='button' value='X' onClick={props.handleClickComponenteComentario}></input>
            </div>

            <div className='componenteComentario'>

                <div className='divFotoComentario'>
                    <img src={arrayFoto.foto} alt={arrayFoto.foto}></img>
                </div>

                <div className='divCajaComentarios'>

                    <div className='divComentarioUp'>
                        <div className='divComentarioUpImagen'>
                            <img src={props.avatar} alt={props.nombre_usuario}></img>
                        </div>
                        <p>{props.nombre_usuario}</p>
                    </div>

                    <div className='divComentarioCenter'>

                        <div className='textoComentario'>
                            <div className='divimagenComentario'>
                                <img src={props.avatar} alt={props.nombre_usuario}></img>
                            </div>
                            <div className='divParrafoTexto'>
                            <label>{props.nombre_usuario}:</label>
                                <p>{arrayFoto.texto_foto}</p>
                            </div>                            
                        </div>
                    {
                        isMount && arrayComentario.toString()
                        ?
                        arrayComentario.map( (dato, key) => {
                            return(
                                <div className='textoComentario' key={key} data-codigo={dato.id_comentario} data-codigousuario={dato.id_usuario}>
                                    <div className='divimagenComentario'>
                                        <img src={dato.avatar} alt={dato.avatar}></img>
                                    </div>
                                    <div className='divParrafoTexto'>
                                        <label onClick={handleClickIrAPerfil}>{dato.nombre_usuario}:</label>
                                        <p>{dato.texto_comentario}</p>
                                    </div>                                    
                                </div>
                            )
                        })
                        :
                        <div style={{textAlign:'center', marginTop:'20px'}}>No hay comentarios</div>
                    }
                    </div>

                    <div className='diuvComentarioLikes'>
                        <label data-codigo={arrayFoto.id_foto} type='button' >
                            <FontAwesomeIcon data-codigo='bLike' icon={faHeart}></FontAwesomeIcon>
                        </label>
                    </div>
                    
                    <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                        <input type='text' value={textoComentario} onChange={(params) => setTextoComentario(params.target.value)} placeholder='Agrega un comentario...'></input>
                        <input type='submit' value='Publicar'></input>
                    </form>
                </div>

            </div>
        </div>
    )

}

export default Comentario;