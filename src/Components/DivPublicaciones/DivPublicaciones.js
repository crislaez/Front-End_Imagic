import React, {useState, useEffect} from 'react';
//css
import './DivPublicaciones.css';
//Services
import Services from '../../Services/Services';

function DivPublicaciones(props){

    const [publicaciones, setPublicaciones] = useState('');
    const [seguidores, setSeguidores] = useState('');
    const [seguidos, setSeguidos] = useState('');

    useEffect( () => {
        datosPublicaciones(props.id_usuario);

        return () => {
        }
    },[props.id_usuario])


    const datosPublicaciones = (id) => {

        Services.countPublicity(id)
        .then( response => {
            setPublicaciones(response.data[0].files);
            return Services.countFollower(id)
        })
        .then(response => {
            setSeguidores(response.data[0].files);
            return Services.countFollow(id)
        })
        .then(response => {
            setSeguidos(response.data[0].files);
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='divDatosSeguidores'>
            <p>{publicaciones} publicaciones</p>
            <p>{seguidores} seguidores</p>
            <p>{seguidos} seguidos</p>
        </div>
    )
}

export default DivPublicaciones;