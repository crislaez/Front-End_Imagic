import React, {useState, useEffect} from 'react';
//css
import './Comentario.css'
//Services
import Services from '../../Services/Services';
//alertas
import swal from 'sweetalert';

function Comentario(props){
    
    const [arrayFoto, setArrayFoto] = useState([]);
    const [arrayComentario, setArrayComentario] = useState([]);
    const [textoComentario, setTextoComentario] = useState('');

    
    useEffect( () => {
        fetchFotoPorId();
        fetcComentariosIdFoto();
        return () => {

        }
    },[]);
    
    const fetchFotoPorId = () => {
        Services.getImagenByIdImagen(props.codigoImagen)
        .then(response => {
            console.log(response.data[0])
            setArrayFoto(response.data[0])
        })
    };
    
    const fetcComentariosIdFoto = () => {
        Services.getComentByIdImagen(props.codigoImagen)
        .then(response => {
            console.log(response)
            setArrayComentario(response.data)
        })
    }
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
                    }
                })           
                .catch(err => console.log(err))    
            }
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
        }

        setTextoComentario('');        
    };

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
                    </div>

                    <div className='diuvComentarioLikes'>
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