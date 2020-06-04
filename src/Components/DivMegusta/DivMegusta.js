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
//components
import ContadorMegusta from '../ContadorMegusta/ContadorMegusta';

function DivMegusta(props){

    const [colorLike, setColorLike] = useState('#F5F4F3');
    const [contadorLike, setContadorLike] = useState(0)


    useEffect( () => {
        funcionComprobarLike(localStorage.getItem('userKeyImagic'),props.id_foto);
        return() => {

        }
    },[props.id_foto]);


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
    };
  
    const handleClickMeGusta = () => {
        if(localStorage.getItem('userKeyImagic')){
            const data = new URLSearchParams(`id_megusta=${''}&id_usuario=${localStorage.getItem('userKeyImagic')}&id_foto=${props.id_foto}`);
           
            if(colorLike === 'red'){
                Services.deleteLike(data)
                .then(response => {
                    console.log(response)
                    setColorLike('#F5F4F3');
                    funcionContarLikes(props.id_foto)
                })
                .catch(err => console.log(err)); 

            }else{                       
                Services.addLike(data)
                .then(response => {
                    console.log(response)
                    setColorLike('red');    
                    funcionContarLikes(props.id_foto)                
                })
                .catch(err => console.log(err)); 
            }

        }else{
            swal( "Oops","Debes estar logueado","error" );
        }        
    };

    const funcionContarLikes = (id_foto) => {
        Services.getLikeByIdFoto(id_foto)
        .then(response => {
            setContadorLike(response.data[0].files);
        })
        .catch(err => console.log(err))
    };

    return(
        <div className='divMeGusta'>
            <label onClick={handleClickMeGusta} >
                <FontAwesomeIcon className='iconoCorazon' data-codigo={props.bLike} icon={faHeart} color={colorLike} />
            </label>
            <ContadorMegusta id_foto={props.id_foto} funcionContarLikes={funcionContarLikes} contadorLike={contadorLike}></ContadorMegusta>
        </div>
    )
}

export default DivMegusta