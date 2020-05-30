import React from 'react';

export const arrayDev = 

    [
        {nombre:'Brais Moure', ubicacion:'Galicia'},
        {nombre:'BetaTech', ubicacion:'Madrid'},
        {nombre:'Victor Robles', ubicacion:'Murcia'},
        {nombre:'Juan Vilalvazo', ubicacion:'Mexico'},
    ]

const ArrayContexto = React.createContext(arrayDev);

export default ArrayContexto;