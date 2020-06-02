import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//Services
import Services from '../../Services/Services';
//componente
import FotoInicio from '../FotoInicio/FotoInicio';

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
                            <FotoInicio 
                            key={key}
                            id_foto={dato.id_foto} 
                            id_usuario={dato.id_usuario} 
                            avatar={dato.avatar} 
                            nombre_usuario={dato.nombre_usuario} 
                            foto={dato.foto}
                            texto_foto={dato.texto_foto}
                            funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                            ></FotoInicio>
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