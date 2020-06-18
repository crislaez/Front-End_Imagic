import React, {useState, useEffect} from 'react';
//css
import './Inicio.css';
//Services
import Services from '../../Services/Services';
//componente
import FotoInicio from '../FotoInicio/FotoInicio';
import Historial from '../Historial/Historial';
import InicioDerecha from '../InicioDerecha/InicioDerecha';

function Inicio(props){
    
    const [isMount, setIsMount] = useState(false);
    const [arrayTodasFotos, setArrayTodasFotos] = useState([]);
    const [arrayUsuariosSeguidos, setArrayUsuariosSeguidos] = useState([]);
    
    useEffect( () => {
        setIsMount(true);
        fetchgetAllImagenes();
        funcionDatosSeguidos()
        return() => {
            setIsMount(false);
        }
    },[]);

    const funcionDatosSeguidos = () => {
        // addFollowByIdUser
        Services.addFollowByIdUser(localStorage.getItem('userKeyImagic'))
        .then(response => {
            console.log(response.data);
            setArrayUsuariosSeguidos(response.data)
        })
        .catch(err => console.log(err))
    };

    const fetchgetAllImagenes = () => {
        Services.getAllImagenes()
        .then(response => {
            console.log(response.data)
            setArrayTodasFotos(response.data)
        })
    };

    return(
        <article className='articlePerfil'>
            
            <div className='divContenedorLeft'>
                
            <Historial
            funcionBuscarUsuarios={props.funcionBuscarUsuarios}
            arrayUsuariosSeguidos={arrayUsuariosSeguidos} 
            ></Historial>

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

            <InicioDerecha
            funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
            funcionDatosSeguidos={funcionDatosSeguidos}
            ></InicioDerecha>
            

        </article>
    )
}

export default Inicio;