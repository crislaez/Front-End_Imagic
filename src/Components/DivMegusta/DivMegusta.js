import React, {useState, useEffect} from 'react';
//css
import './DivMegusta.css';
//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
//alertas
import swal from 'sweetalert';
//Services
import Services from '../../Services/Services';

function DivMegusta(props){

    const [colorLike, setColorLike] = useState('#F5F4F3');

    useEffect( () => {
        funcionComprobarLike(localStorage.getItem('userKeyImagic'),props.id_foto);
        return() => {

        }
    },[props.id_foto])

    const funcionComprobarLike = (id_usuario, id_foto) => {
        Services.getLikeById(id_usuario, id_foto)
        .then(response => {
            if(response.data.toString()){
                setColorLike('red')
            }else{
                setColorLike('#F5F4F3')
            }
   
        })
        .catch(err => console.log(err))
    }
  
    const handleClickMeGusta = () => {
        if(localStorage.getItem('userKeyImagic')){
            console.log(localStorage.getItem('userKeyImagic'))
            // console.log('usuario'+props.id_usuario)
            console.log('foto'+props.id_foto)
            
            const data = new URLSearchParams(`id_megusta=${''}&id_usuario=${localStorage.getItem('userKeyImagic')}&id_foto=${props.id_foto}`);
            Services.addLike(data)
            .then(response => {
                console.log(response)
                setColorLike('red');
            })
            .catch(err => console.log(err));

        }else{
            swal( "Oops","Debes estar logueado","error" );
        }        
    }

    return(
        <div className='divMeGusta'>
            <label  onClick={handleClickMeGusta} >
                <FontAwesomeIcon data-codigo={props.bLike} icon={faHeart} color={colorLike} />
            </label>
            <p>O Me gusta</p>
        </div>
    )
}

export default DivMegusta