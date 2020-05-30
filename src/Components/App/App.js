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

    const [logueado, setLogueado] = useState(false);
    const [ventana,setVentana] = useState('');
    const[ventanaSolidcitudes, setVentanaSolicitudes] = useState(false);

    useEffect( () => {
        if(localStorage.getItem('userNameImagic') && localStorage.getItem('userKeyImagic')){
            setLogueado(true);
        }else{
            setLogueado(false);
        }
    },[])

    const funcionCambiarLogeadoAWeb = () => {
        setLogueado(!logueado);
    }

    const funcionCambiarVentana = (event) => {
        if(event.target.tagName === 'path'){
            setVentana(event.target.parentNode.dataset.codigo)
        }else{
            setVentana(event.target.dataset.codigo)
        }        
    }

    const funcionVentanaSolicitudes = () => {
        setVentanaSolicitudes(!ventanaSolidcitudes);
    }
    // console.log(ventana);
    return(
        <div>
            {
                !logueado
                ?
                <VentanaPrincipal funcionCambiarLogeadoAWeb={funcionCambiarLogeadoAWeb}></VentanaPrincipal>
                :
                <div>
                    <Header funcionCambiarVentana={funcionCambiarVentana} funcionVentanaSolicitudes={funcionVentanaSolicitudes}></Header>            
                    <Section ventana={ventana} ventanaSolidcitudes={ventanaSolidcitudes}></Section>
                    <Footer></Footer>
                </div>
            }            
        </div>
    )
}

export default App;