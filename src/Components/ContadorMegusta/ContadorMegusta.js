import React, {useState, useEffect} from 'react';
//css
import './ContadorMegusta.css';
import Services from '../../Services/Services';

function ContadorMegusta(props){
    

    useEffect( () => {

        const funcionContarLikes = props.funcionContarLikes;
        funcionContarLikes(props.id_foto)
    },[props.id_foto]);

    return(
        <p className='pContadorDiv'>{props.contadorLike} Me gusta</p>
    )
}

export default ContadorMegusta;