import React,{useState, useEffect} from 'react';
//css
import './SubirImagen.css';
//alertas
import swal from 'sweetalert';
//Services
import Services from '../../Services/Services';

function SubirImagen (props){
    
    const [imagen, setImange] = useState('');
    const [textoImagen, setTextoImagen] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!localStorage.getItem('userKeyImagic')){
            swal ( "Oops" , "Debes estar logueado" , "error" );
        }else if(!imagen){
            swal ( "Oops" , "Selecciona una imagen" , "error" );
        }else if(!textoImagen){
            swal ( "Oops" , "Selecciona un texto para la imagen" , "error" );
        }else{
            
            let formData = new FormData();
            formData.append('id_usuario',localStorage.getItem('userKeyImagic'));
            formData.append('id_foto','');
            formData.append('foto',imagen);
            formData.append('texto_foto',textoImagen);
            
            Services.addImagen(formData)
            .then(response => {
                // console.log(response);
                swal("Ok", "Foto subida correctamente", "success");
                //llamamos a la funcion que esta en el section para que recarge el array de las imagenes
                const fetchFotosUsuario = props.fetchFotosUsuario;
                fetchFotosUsuario(localStorage.getItem('userKeyImagic'));
                //llamamos a la funcion que esta en app para cerrar el pop up este de subir foto
                const funcionVentanaSubirImagen = props.funcionVentanaSubirImagen;
                funcionVentanaSubirImagen();
            })
            .catch(err => console.log(err))
        }

        document.querySelector('#foto').value="";
        setTextoImagen('');
    }

    return(
        <div className='divSubirImagen' >
            <div className='contenedorSubirImagen'>
                <div className='divTituloSubirImagenes'>
                    <h3>Escoje tus mejores imagenes</h3>
                    <input type='button' value='X' onClick={props.funcionVentanaSubirImagen}></input>
                </div>

                <form onSubmit={handleSubmit} action='' method='' encType='multipart/form-data'>
                    <label>Imagen</label>
                    <input id='foto' type='file' onChange={(params) => {setImange(params.target.files[0])}}></input>
                    <br></br>
                    <input type='text' name='texto' value={textoImagen} onChange={(params) => {setTextoImagen(params.target.value)}} placeholder='titulo de la imagen'></input>
                    <br></br>
                    <input type='submit' value='Subir'></input>
                </form>
            </div>
        </div>
    )
}

export default SubirImagen;