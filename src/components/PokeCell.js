import React from 'react';

const PokeCell = props => {
    return (
        <div className="PokeCell" onClick={props.selectHandler}>
            <img src={props.sprite} width="100"/>
        </div>
    );
};

export default PokeCell;