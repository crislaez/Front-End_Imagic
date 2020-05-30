// REACT_APP_RUTA 

const addUser = (data) => {
    return fetch(process.env.REACT_APP_RUTA+'/addUser',{method:'POST', body:data}).then(data => data.json());
}

export default 
    {
        addUser
    }
