import React, {useState, useEffect} from 'react';
//css
import './Comentario.css'
//Services
import Services from '../../Services/Services';
//alertas
import swal from 'sweetalert';
//components
import DivMegusta from '../DivMegusta/DivMegusta';
import ComentarioIndividual from '../ComentarioIndividual/ComentarioIndividual'

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
                        swal("Ok", "Comentado", "success");
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

    // console.log(arrayFoto.foto);
    // console.log(props.codigoImagen)
    // console.log(arrayComentario)
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
                               <ComentarioIndividual 
                               key={key} 
                               id_comentario={dato.id_comentario} 
                               id_usuario={dato.id_usuario} 
                               avatar={dato.avatar}
                               nombre_usuario={props.nombre_usuario}
                               texto_comentario={dato.texto_comentario}
                               funcionBuscarUsuarios={props.funcionBuscarUsuarios}
                               handleClickComponenteComentario={props.handleClickComponenteComentario}
                               fetchComentariosIdFoto={fetchComentariosIdFoto}
                               ></ComentarioIndividual>
                            )
                        })
                        :
                        <div style={{textAlign:'center', marginTop:'20px'}}>No hay comentarios</div>
                    }
                    </div>

                    <DivMegusta id_usuario={arrayFoto.id_usuario} bLike={'bLike'} id_foto={arrayFoto.id_foto}></DivMegusta>
                 
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
// <DivMegusta id_usuario={arrayFoto.id_usuario} bLike={'bLike'} id_foto={arrayFoto.id_foto}></DivMegusta>