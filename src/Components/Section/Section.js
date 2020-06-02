import React, {useState, useEffect} from 'react';
//css
import './Section.css';
//components
import Perfil from '../Perfil/Perfil';
import Inicio from '../Inicio/Inicio';
import Solicitudes from '../Solicitudes/Solicitudes';
import SubirImagen from '../SubirImagen/SubirImagen'
//Services
import Services from '../../Services/Services';

function Section(props){

    // const [arrayFotos, setArrayFotos] = useState([]); 
    // const [arrayUsuario, setArrayUsuario] = useState([]);
    // const [mostratUSuariOVisitante, setMostratUSuariOVisitante] = useState(true)

    useEffect( () => {
        // fetchFotosUsuario(localStorage.getItem('userKeyImagic'))
        // fetchDatosUsuarios(localStorage.getItem('userKeyImagic'))
    },[])

    // const fetchFotosUsuario = (idUsuario) => {
    //     Services.getImagenesById(idUsuario)
    //     .then(response => {
    //         setArrayFotos(response.data)
    //     })
    //     .catch(err => console.log(err));
    // }

    // const fetchDatosUsuarios = (id) => {
    //     Services.getUserById(id)
    //     .then(response => {
    //         setArrayUsuario(response.data[0])
    //     })
    //     .catch(err => console.log(err));
    // }

    // const funcionBuscarUsuarios = (id) => {        
    //     if(id !== localStorage.getItem('userKeyImagic')){
    //         fetchFotosUsuario(id);
    //         fetchDatosUsuarios(id)
    //         // console.log('diferentes')
    //         setMostratUSuariOVisitante(false)
    //     }else{
    //         fetchFotosUsuario(localStorage.getItem('userKeyImagic'));
    //         fetchDatosUsuarios(localStorage.getItem('userKeyImagic'))
    //         // console.log('iguales')
    //         setMostratUSuariOVisitante(true)
    //     }     
    // }

    return(
        <section>
            {
                props.ventana === 'bMessage'
                ?
                    <Inicio 
                    funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                    ></Inicio>
                :
                props.ventana === 'bExplore'
                ?
                    <h2>Segundo boton</h2>
                :
                props.ventana === 'bPerfil'
                ?
                   <Perfil 
                   arrayFotos={props.arrayFotos} 
                   arrayUsuario={props.arrayUsuario}
                   funcionBuscarUsuarios={props.funcionBuscarUsuarios} 
                   mostratUSuariOVisitante={props.mostratUSuariOVisitante}
                   ></Perfil>
                :
                <div style={{display:'none'}}></div>
            }

            {
                props.ventanaSubirImagen
                ?
                <SubirImagen funcionVentanaSubirImagen={props.funcionVentanaSubirImagen} fetchFotosUsuario={props.fetchFotosUsuario}></SubirImagen>
                :
                <div styile={{display:'none'}}></div>
            }

            {
                props.ventanaSolidcitudes
                ?
                <Solicitudes></Solicitudes>
                :
                <div styile={{display:'none'}}></div>
            }
            
        </section>
    )
}

export default Section;