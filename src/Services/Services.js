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

const addComent = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addComent',{method:'POST',body:data}).then(data => data.json())
}

const getComentByIdImagen = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getComentByIdImagen/'+data, {method:'GET'}).then(data => data.json())
}

const getUserByUserName = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/getUserByUserName/'+data, {method:'GET'}).then(data => data.json())
}

const addFollow = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addFollow',{method:'POST', body:data}).then(data => data.json())
}

const deleteFollow = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/deleteFollow',{method:'DELETE',body:data}).then(data => data.json())
}

const checkFollow = (data1, data2) => {
    return fetch(process.env.REACT_APP_RUTA+'/checkFollow/'+data1+'/'+data2, {method:'GET'}).then(data => data.json())
}

const countPublicity = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/countPublicity/'+data,{method:'GET'}).then(data => data.json())
}

const countFollower = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/countFollower/'+data,{method:'GET'}).then(data => data.json())
}

const countFollow = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/countFollow/'+data,{method:'GET'}).then(data => data.json())
}

const addLike = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addLike',{method:'POST',body:data}).then(data => data.json())
}

const getLikeById = (data, data2) => {
    return fetch(process.env.REACT_APP_RUTA+'/getLikeById/'+data+'/'+data2).then(data => data.json())
}

const deleteLike = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/deleteLike',{method:'POST',body:data}).then(data => data.json())
}

const getLikeByIdFoto = (data) => {
     return fetch(process.env.REACT_APP_RUTA+'/getLikeByIdFoto/'+data,{method:'GET'}).then(data => data.json())
}

const addFollowByIdUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addFollowByIdUser/'+data,{method:'GET'}).then(data => data.json())
}

const addChat = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addChat',{method:'POST',body:data}).then(data => data.json())
}

const getChatByUsers = (id1, id2) => {
    return fetch(process.env.REACT_APP_RUTA+'/getChatByUsers/'+id1+'/'+id2,{method:'GET'}).then(data => data.json())
}
export default 
    {
        addUser,
        login,
        getUserById,
        addImagen,
        getImagenesById,
        getAllImagenes,
        getImagenByIdImagen,
        addComent,
        getComentByIdImagen,
        getUserByUserName,
        addFollow,
        deleteFollow,
        checkFollow,
        countPublicity,
        countFollower,
        countFollow,
        addLike,
        getLikeById,
        deleteLike,
        getLikeByIdFoto,
        addFollowByIdUser,
        addChat,
        getChatByUsers
    }
