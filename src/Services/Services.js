// REACT_APP_RUTA 

const addUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addUser',{method:'POST', body:data}).then(data => data.json());
}

const login = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/login', {method:'POST', body:data}).then(data => data.json())
}

const addUserById = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addUserById/'+data, {method:'GET'}).then(data => data.json())
}

// SELECT * FROM fotos INNER JOIN usuarios ON fotos.id_usuario = usuarios.id_usuario WHERE usuarios.id_usuario = 9

export default 
    {
        addUser,
        login,
        addUserById
    }
