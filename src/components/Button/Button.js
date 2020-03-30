import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
import './Button.css';

function Button(props){
    return(
        <div className="button">
            <button onClick={() => props.createNewTodo()}>
                {props.value}
            </button>
        </div>
    );
}

export default Button;