import React,{ useState } from 'react';
import './Delete.css';

function Delete(){
    return(
        <div className="delete">
            <img src={require("../../images/delete.png")} alt="delete"/>
        </div>
    );
}

export default Delete;