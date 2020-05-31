import React, {useState, useEffect} from 'react';
//css
import './Perfil.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons'
//Services
import Services from '../../Services/Services';

function Perfil(props){

    const [isMount, setIsMount] = useState(false); 
    const [arrayUsuario, setArrayUsuario] = useState([]);
    const [arrayFotos, setArrayFotos] = useState([]); 

    useEffect(() =>{
        setIsMount(true);
        fetchDatosUsuarios();
        // fetchFotosUsuario();

        return () => {
            setIsMount(false);
        }
    },[])

    const fetchDatosUsuarios = () => {
        Services.getUserById(localStorage.getItem('userKeyImagic'))
        .then(response => {
            // console.log(response.data)
            setArrayUsuario(response.data[0])
        })
        .catch(err => console.log(err));
    }
    
    // const fetchFotosUsuario = () => {
    //     Services.getImagenesById(localStorage.getItem('userKeyImagic'))
    //     .then(response => {
    //         // console.log(response.data)
    //         setArrayFotos(response.data)
    //     })
    //     .catch(err => console.log(err));
    // }

    console.log(props.arrayFotos);
    // console.log(isMount)
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
                        <div key={key} data-codigo={dato.id_foto} data-codusuario={dato.id_usuario} className='contenedorFotoUsuario'>
                            <img src={dato.foto} alt={dato.foto}></img>
                        </div>
                    )
                })
                :
                <div>No hay fotos</div>
            }

            </div>

        </article>
    )
}

export default Perfil;