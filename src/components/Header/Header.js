import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
import './Header.css';

function Header(props){
    return(
        <div className="header">
           <h3>{props.value}</h3>
        </div>
    );
}

export default Header;