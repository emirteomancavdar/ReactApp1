import React from 'react';
import initialObject from './registers.json';

function ListMap() {
    var localObject = JSON.parse(JSON.stringify(initialObject))
    return (
        <div>
            {localObject.map((row, i) => (
                <div key={'Listmap' +row.Tag}>
                    {/* {row.PossibleValues ?
                        <p>{row.PossibleValues.find(key => key.Enum === 3)?.Enum}</p>
                        : <p></p>
                    } */}
                </div>
            ))}


        </div>
    )
}
export default ListMap
