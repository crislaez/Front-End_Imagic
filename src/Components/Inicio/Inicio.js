import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//Services
import Services from '../../Services/Services';

function Inicio(props){
    
    const [isMount, setIsMount] = useState(false);
    const [arrayTodasFotos, setArrayTodasFotos] = useState([]);

    useEffect( () => {
        setIsMount(true);
        fetchgetAllImagenes();

        return() => {
            setIsMount(false);
        }
    },[]);

    const fetchgetAllImagenes = () => {
        Services.getAllImagenes()
        .then(response => {
            console.log(response.data)
            setArrayTodasFotos(response.data)
        })
    }

    return(
        <article className='articlePerfil'>
            
            <div className='divContenedorLeft'>
                <div className='divHistorial'>
                </div>

                {
                    isMount && arrayTodasFotos.toString()
                    ?
                    arrayTodasFotos.map( (dato, key) => {
                        return(
                            <div key={key} className='divFotosInicio' data-codigo={dato.id_foto} data-codigousuario={dato.id_usuario}>
                                
                                <div className='divUsuario'>
                                    <div className='divFotoPrincipalsuario'>
                                        <img src={dato.avatar} alt={dato.avatar}></img>                                        
                                    </div>

                                    <h3>{dato.nombre_usuario}</h3>
                                </div>

                                <div className='divFotoUsuario'>
                                    <img src={dato.foto} alt={dato.foto}></img>
                                </div>

                                <div className='divComentarios'>
                                </div>
                                

                            </div>
                        )
                    })
                    :
                    <div>Cargando...</div>
                }
            </div>

            <div className='divContenedorRight'>
            </div>

        </article>
    )
}

export default Inicio;