import React, { useState } from 'react';
import Delete from '../Delete/Delete';
import './Header.css';

function Header(props){
    const [headerText, headerTextSet] = useState(props.value);
    
    return(
        <div className="header">
            {
                <div className="header__Text">
                    <h3>{headerText}</h3>
                </div>
            }
            <Delete deleteItem={() => props.deleteColumn(props.columnId)}/>
        </div>
    );
}

export default Header;