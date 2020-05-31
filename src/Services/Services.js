// REACT_APP_RUTA 

const addUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addUser',{method:'POST', body:data}).then(data => data.json());
}

const login = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/login', {method:'POST', body:data}).then(data => data.json())
}

const getUserById = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getUserById/'+data, {method:'GET'}).then(data => data.json())
}

const addImagen = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addImagen',{method:'POST', body:data}).then(data => data.json())
}

const getImagenesById = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getImagenesById/'+data,{method:'GET'}).then(data => data.json())
}

const getAllImagenes = () => {
    return fetch(process.env.REACT_APP_RUTA+'/getAllImagenes',{method:'GET'}).then(data => data.json())
}

const getImagenByIdImagen = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getImagenByIdImagen/'+data,{method:'GET'}).then(data => data.json())
}

export default 
    {
        addUser,
        login,
        getUserById,
        addImagen,
        getImagenesById,
        getAllImagenes,
        getImagenByIdImagen
    }
