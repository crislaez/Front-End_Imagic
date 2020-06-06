import React from 'react';
//css
import './DivBuscador.css';

function DivBuscador(props){

    const handleClick = (event) => {
        console.log(event.target.parentNode.parentNode.dataset.codigousuario)
        //llamamos a la funcion que esta en header para cerrar este componente
        const funcionCerrarVentanaDivBuscador = props.funcionCerrarVentanaDivBuscador
        funcionCerrarVentanaDivBuscador();
        //funcion que esta en app para buscar el usuario
        const funcionBuscarUsuarios = props.funcionBuscarUsuarios;
        funcionBuscarUsuarios(event.target.parentNode.parentNode.dataset.codigousuario);
    }
    // console.log(props.arrayUsuariosBuscados)

    return(
        <div className='divCajitaBuscador'>
        {
            props.arrayUsuariosBuscados.map( (dato, key) => {
                return(
                    <div key={key} data-codigousuario={dato.id_usuario} className='divDatoUsuarioBuscador'>
                        <div className='divImagenUsuarioBuscador'>
                            <img src={dato.avatar} alt={dato.avatar}></img>
                        </div>
                        <div className='divNombreUsuarioBuscador'>
                            <label onClick={handleClick}>{dato.nombre_usuario}</label>
                            <p>{dato.nombre_completo}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default DivBuscador;