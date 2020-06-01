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

function Perfil(props){

    const [isMount, setIsMount] = useState(false); 
    const [arrayUsuario, setArrayUsuario] = useState([]);
    // const [arrayFotos, setArrayFotos] = useState([]); 
    const [ventanaComentario, setVentanaComentario] = useState(false);
    const [codigoImagen, setCodigoImagen] = useState('');

    useEffect(() =>{
        setIsMount(true);
        fetchDatosUsuarios();

        return () => {
            setIsMount(false);
        }
    },[]);

    const fetchDatosUsuarios = () => {
        Services.getUserById(localStorage.getItem('userKeyImagic'))
        .then(response => {
            setArrayUsuario(response.data[0])
        })
        .catch(err => console.log(err));
    }
    
    const handleClickComponenteComentario = (event) => {

       if(ventanaComentario){
            document.body.style.overflow = 'scroll'
       }else{        
            window.scroll(0, 0);
            document.body.style.overflow = 'hidden'
       }
       setVentanaComentario(!ventanaComentario);
       setCodigoImagen(event.target.dataset.codigo)
    }
    
    // console.log(props.arrayFotos);
    // console.log(isMount)
    // console.log(arrayUsuario.avatar)
    // console.log(arrayUsuario.nombre_usuario)
    return(
        <article className='articlePerfil'>

            <div className='cabeceraPerfil'>
                <div className='divFotoPerfil'>
                    <img src={arrayUsuario.avatar} alt={arrayUsuario.avatar}></img>
                </div>

                <div className='divDatosUsuariosPerfil'>
                    <div className='divNombreUsuarioPerfil'>
                        <h3>{arrayUsuario.nombre_usuario}</h3>
                    </div>
                    
                    <div className='divBotonEditar'>
                        <input type='button' value='Editar perfil'></input>
                    </div>
                    
                    <div className='divBotonEngranaje'>
                        <label><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></label>
                    </div>

                    <div className='divDatosSeguidores'>
                        <p>0 publicaciones</p>
                        <p>0 seguidores</p>
                        <p>0 seguidores</p>
                    </div>

                    <div className='divNombreUsuario'>
                        <p><strong>{arrayUsuario.nombre_completo}</strong></p>
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
                <Comentario handleClickComponenteComentario={handleClickComponenteComentario} codigoImagen={codigoImagen} avatar={arrayUsuario.avatar} nombre_usuario={arrayUsuario.nombre_usuario}></Comentario>
                :
                <div style={{display:'none'}}></div>
            }

        </article>
    )
}

export default Perfil;