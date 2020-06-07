import React,{useState, useEffect} from 'react';
//css
import './Engranaje.css';
//alertas
import swal from 'sweetalert';

function Engranaje(props){


    const handleClickCerrarSesion = () => {
        swal({
            title: "Esas seguro?",
            text: "Seguro que quieres cerrar sesion?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem('userKeyImagic');
            localStorage.removeItem('userNameImagic');
            swal("Ok", "Has cerrado sesion", "success");
            window.location.reload(true)
        }
      });
    };

    return(
        <div className='divEngranaje'>
            <div className='contenedorEngranaje'>
                <input type='button' value='Cambiar contraseña'></input>
                <input type='button' value='Tarjeta de identificacion'></input>
                <input type='button' value='Aplicaciones y sitios web'></input>
                <input type='button' value='Notificaciones'></input>
                <input type='button' value='Privacidad y seguridad'></input>
                <input type='button' value='Actividad de iniciop de sesion'></input>
                <input type='button' value='Correos electronicos de Imagic'></input>
                <input type='button' value='Informar de un problema'></input>
                <input type='button' value='Cerrar sesion' onClick={handleClickCerrarSesion}></input>
                <input type='button' value='Cancelar' onClick={props.handleClickEngranaje}></input>
            </div>
        </div>
    )
}

export default Engranaje;