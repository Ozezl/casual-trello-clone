import React from 'react';
import './Delete.css';

function Delete(props){
    return(
        <div className="delete">
            <img src={require("../../images/delete.png")} alt="delete" onClick={() => props.deleteItem()}/>
        </div>
    );
}

export default Delete;