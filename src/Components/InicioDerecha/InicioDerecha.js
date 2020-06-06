import React,{useState, useEffect} from 'react';
//css
import './InicioDerecha.css';
//alertas
import swal from 'sweetalert';
// //Services
import Services from '../../Services/Services';

function InicioDerecha(props){

    const [isMount, setIsMount] = useState(false); 
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosUsuariosNoSegudios, setDatopsUsuariosNoSeguidos] = useState([]);
    const [datosUsuariosSeguidos, setDatosUsuariosSeguidos] = useState([])

    useEffect( () => {
        setIsMount(true);
        //cargamos los datos del usuario logueado
        datosUsuarios();
        //conseguir datos usuarios no seguidos
        datosUsuarioNoSigue();

        return() => {
            setIsMount(false)
        }
    },[])

    //funcion para cargar los datos del usuario logueado
    const datosUsuarios = () => {
        Services.getUserById(localStorage.getItem('userKeyImagic'))
        .then(response => {
            setDatosUsuario(response.data[0]);
            return Services.addFollowByIdUser(localStorage.getItem('userKeyImagic'))
        })
        .then( response => {
            console.log(response.data);
            setDatosUsuariosSeguidos(response.data)
            
        })
        .catch(err => console.log(err))
    };

    //conseguir todos los usuarios que no seguimos pero algunos nmombre seran que otros usuarios si siguen
    const datosUsuarioNoSigue = () => {
        Services.getAllUser()
        .then( response => {
            console.log(response.data);
            setDatopsUsuariosNoSeguidos(response.data)
        })
        .catch(err => console.log(err));
    };

    const handleClick = (event) => {
        // console.log(event.target.dataset.codigo);
        if(localStorage.getItem('userKeyImagic')){

            let data = new URLSearchParams(`id_seguir=${''}&id_usuario_seguido=${event.target.dataset.codigo}&id_usuario_seguidor=${parseInt(localStorage.getItem('userKeyImagic'))}`)
            Services.addFollow(data)
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
            //cargamos los datos del usuario logueado
            datosUsuarios();
            //conseguir datos usuarios no seguidos
            datosUsuarioNoSigue();
        }else{
            swal ( "Oops" , "Debes estar logueado" , "error" );
            window.location.reload(true);
        }
        
    }

    const handleClickVerPerfil = (event) => {
        // funcionBuscarUsuarios
        console.log(event.target.dataset.codigo);
        //llamamops a la funcion que esta en app para redireccinar al perfil del usuario
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.dataset.codigo);
    };

    return(
        <aside className='divContenedorRight'>
            <div className='divCabeceraAside'>
                <div className='divCabeceraImagen'>
                    <img src={datosUsuario.avatar} alt={datosUsuario.avatar}></img>
                </div>

                <div className='divCabeceraTitulo'> 
                    <p><strong>{datosUsuario.nombre_usuario}</strong></p>
                    <p>{datosUsuario.nombre_completo}</p>
                </div>
            </div>

            <div className='divContenedor'>
                <p className='pSuguerencias'>Sugerencias para ti</p>
                {
                    isMount && datosUsuariosNoSegudios.toString()
                    ?
                    datosUsuariosNoSegudios.map( (dato, key) => {
                        if(!datosUsuariosSeguidos.find(d => d.id_usuario === dato.id_usuario)){
                            return(
                                <div key={key} className='divUsuarioNoSeguidos'>
                                    <div className='divUsuarioNoSegudiImagen'>
                                        <img src={dato.avatar} alt={dato.avatar}></img>
                                    </div>
                                    <div className='divUsuariosNoSeguidosParrafo'>
                                        <p className='parrafoNoSeguidos' data-codigo={dato.id_usuario} onClick={handleClickVerPerfil}>{dato.nombre_usuario}</p>
                                        <p>{dato.nombre_completo}</p>
                                    </div>
                                    <div className='divUsuriosBotonSeguir'>
                                        <input data-codigo={dato.id_usuario} type='button' value='Seguir' onClick={handleClick}></input>
                                    </div>
                                </div>
                            )
                        }                        
                    })
                    :
                    <div>No hay sugerencias...</div>
                }
            </div>
        </aside>
    )
}

export default InicioDerecha