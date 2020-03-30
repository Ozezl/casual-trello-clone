import React,{ useState } from 'react';
import AddField from '../AddField/AddField'
import ReactDOM, { render } from 'react-dom';
import './Column.css';

function Column(props){
        return(
            <div className="column">
                {props.children}
            </div>
        );
}

export default Column;