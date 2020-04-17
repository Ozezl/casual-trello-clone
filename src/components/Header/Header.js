import React,{ useState } from 'react';
import Delete from '../Delete/Delete';
import './Header.css';

function Header(props){
    const [headerText,headerTextSet] = useState(props.value);
    const [showInput,showInputSet] = useState(false);
    
    function changeHandler(e){
        headerTextSet(e.target.value);
    }
    return(
        <div className="header">
            {showInput?
            <div className="header__input" onClick={() => console.log()}>
                <input type="text" value={headerText} onChange={changeHandler}/>
            </div>
            :
            <div className="header__Text" onClick={() => showInputSet(true)}>
                <h3>{headerText}</h3>
            </div>
            }
            <Delete deleteItem={() => props.deleteColumn(props.columnId)}/>
        </div>
    );
}

export default Header;