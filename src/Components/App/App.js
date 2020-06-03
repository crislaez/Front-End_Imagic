import React, {useState, useEffect} from 'react';
//css
import './App.css';
//components
import VentanaPrincipal from '../VentanaPrincipal/VentanaPrincipal'
import Header from '../Header/Header';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';
//Services
import Services from '../../Services/Services';

function App(props){

    const [logueado, setLogueado] = useState(false); //variable si nos dire si estamso logueados o no
    const [ventana,setVentana] = useState('bMessage'); //variable que cambia las ventanas dependiendo de donde clickemos
    const [ventanaSolidcitudes, setVentanaSolicitudes] = useState(false); //variable que habre el propup de las soplicitudas
    const [ventanaSubirImagen, setVentanaSubirImmagen] = useState(false);//varaible que habre el popup para subir la imagen

    const [arrayFotos, setArrayFotos] = useState([]); //array donde estan todas las fotos del usuario que se als pasaremos al section y a perfil
    const [arrayUsuario, setArrayUsuario] = useState([]); //array donde estan los datos del usuario, el logueado y al que queramos ver el perfil
    const [mostratUSuariOVisitante, setMostratUSuariOVisitante] = useState(true);//varaiable para el componente perfil, dependiendo de si es perfil propio o perfil de usuario



    useEffect( () => {
        if(localStorage.getItem('userNameImagic') && localStorage.getItem('userKeyImagic')){
            setLogueado(true);
            // fetchFotosUsuario(localStorage.getItem('userKeyImagic'))
            // fetchDatosUsuarios(localStorage.getItem('userKeyImagic'))
        }else{
            setLogueado(false);
        }
    },[]);



    const fetchFotosUsuario = (idUsuario) => {
        Services.getImagenesById(idUsuario)
        .then(response => {
            setArrayFotos(response.data)
        })
        .catch(err => console.log(err));
    };

    const fetchDatosUsuarios = (id) => {
        Services.getUserById(id)
        .then(response => {
            setArrayUsuario(response.data[0])
        })
        .catch(err => console.log(err));
    };

    const funcionBuscarUsuarios = (id) => {      
        if(id !== localStorage.getItem('userKeyImagic')){
            fetchFotosUsuario(id);
            fetchDatosUsuarios(id)
            setVentana('bPerfil');
            setMostratUSuariOVisitante(false)
        }else{
            fetchFotosUsuario(localStorage.getItem('userKeyImagic'));
            fetchDatosUsuarios(localStorage.getItem('userKeyImagic'))
            setMostratUSuariOVisitante(true)
        }     
    };

    //funcion de logeo, cargara un componente de logeo o la web principal
    const funcionCambiarLogeadoAWeb = () => {
        setLogueado(!logueado);
    };

    //funcion que carga una ventana en el section
    const funcionCambiarVentana = (event) => {
        if(event.target.tagName === 'path'){
            setVentana(event.target.parentNode.dataset.codigo)
        }else{
            setVentana(event.target.dataset.codigo)
        }                
    };

    //funcion que habre el popup de las solicitudes en el section
    const funcionVentanaSolicitudes = () => {
        setVentanaSolicitudes(!ventanaSolidcitudes);
    };

     //funcion para cargar el popup para subir la imagen
     const funcionVentanaSubirImagen = (event) => {
        setVentanaSubirImmagen(!ventanaSubirImagen);       
     };


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
                    funcionBuscarUsuarios={funcionBuscarUsuarios}
                    >
                    </Header>      

                    <Section 
                    ventana={ventana} 
                    arrayUsuario={arrayUsuario}
                    arrayFotos={arrayFotos}
                    mostratUSuariOVisitante={mostratUSuariOVisitante}
                    fetchFotosUsuario={fetchFotosUsuario}
                    funcionBuscarUsuarios={funcionBuscarUsuarios}
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