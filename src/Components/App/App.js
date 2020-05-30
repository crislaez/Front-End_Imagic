import React, {useState, useEffect} from 'react';
//css
import './App.css';
//components
import VentanaPrincipal from '../VentanaPrincipal/VentanaPrincipal'
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';
import ArrayExportado, {arrayDev} from '../../Context/Context';

function App(props){

    const [logueado, setLogueado] = useState(false);

    useEffect( () => {
        if(localStorage.getItem('userNameImagic') && localStorage.getItem('userKeyImagic')){
            setLogueado(true);
        }else{
            setLogueado(false);
        }
    },[])

    return(
        <ArrayExportado.Provider value={arrayDev}>
        <div>
            {
                !logueado
                ?
                <VentanaPrincipal></VentanaPrincipal>
                :
                <div>
                    <Header></Header>            
                    <Section></Section>
                    <Footer></Footer>
                </div>
            }            
        </div>
        </ArrayExportado.Provider>
    )
}

export default App;