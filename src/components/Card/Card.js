import React,{ useState } from 'react';
import Delete from '../Delete/Delete';
import './Card.css';

function Card(props){
    return(
        <div className="card">
            {props.value}
            <Delete/>
        </div>
    );
}

export default Card;