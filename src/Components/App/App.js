import React, {useState, useEffect} from 'react';
//css
import './App.css';
//components
import VentanaPrincipal from '../VentanaPrincipal/VentanaPrincipal'
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';
import ArrayExportado, {arrayDos,arrayDev} from '../../Context/Context';

function App(props){

    const [logueado, setLogueado] = useState(false); //variable si nos dire si estamso logueados o no
    const [ventana,setVentana] = useState('bMessage'); //variable que cambia las ventanas dependiendo de donde clickemos
    const [ventanaSolidcitudes, setVentanaSolicitudes] = useState(false); //variable que habre el propup de las soplicitudas
    const [ventanaSubirImagen, setVentanaSubirImmagen] = useState(false);//varaible que habre el popup para subir la imagen

    useEffect( () => {
        if(localStorage.getItem('userNameImagic') && localStorage.getItem('userKeyImagic')){
            setLogueado(true);
        }else{
            setLogueado(false);
        }
    },[])

    //funcion de logeo, cargara un componente de logeo o la web principal
    const funcionCambiarLogeadoAWeb = () => {
        setLogueado(!logueado);
    }

    //funcion que carga una ventana en el section
    const funcionCambiarVentana = (event) => {
        if(event.target.tagName === 'path'){
            setVentana(event.target.parentNode.dataset.codigo)
        }else{
            setVentana(event.target.dataset.codigo)
        }        
    }

    //funcion que habre el popup de las solicitudes en el section
    const funcionVentanaSolicitudes = () => {
        setVentanaSolicitudes(!ventanaSolidcitudes);
    }
     //funcion para cargar el popup para subir la imagen
     const funcionVentanaSubirImagen = (event) => {
        setVentanaSubirImmagen(!ventanaSubirImagen);       
     }

    return(
        <div>
            {
                !logueado
                ?
                <VentanaPrincipal funcionCambiarLogeadoAWeb={funcionCambiarLogeadoAWeb}></VentanaPrincipal>
                :
                <div>
                    <Header 
                    funcionCambiarVentana={funcionCambiarVentana} 
                    funcionVentanaSolicitudes={funcionVentanaSolicitudes}
                    funcionVentanaSubirImagen={funcionVentanaSubirImagen}
                    >
                    </Header>      

                    <Section 
                    ventana={ventana} 
                    ventanaSolidcitudes={ventanaSolidcitudes}
                    ventanaSubirImagen={ventanaSubirImagen}
                    funcionVentanaSubirImagen={funcionVentanaSubirImagen}
                    ></Section>

                    <Footer></Footer>
                </div>
            }            
        </div>
    )
}

export default App;