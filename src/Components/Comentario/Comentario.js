import React, {useState, useEffect} from 'react';
//css
import './Comentario.css'
//Services
import Services from '../../Services/Services';

function Comentario(props){
    
    const [arrayFoto, setArrayFoto] = useState([]);
    
    useEffect( () => {
        fetchFotoPorId();

        return () => {

        }
    },[]);
    
    const fetchFotoPorId = () => {
        Services.getImagenByIdImagen(props.codigoImagen)
        .then(response => {
            console.log(response.data[0])
            setArrayFoto(response.data[0])
        })
    }
    console.log(arrayFoto.foto)
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

                </div>
            </div>
        </div>
    )

}

export default Comentario;