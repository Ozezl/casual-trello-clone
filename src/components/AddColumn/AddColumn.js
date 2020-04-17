import React,{ useState } from 'react';
import "./AddColumn.css";

function AddColumn(props){
    const [show,showSet] = useState(false);
    const [header,headerSet] = useState(' ');

    function changeHandler(e){
        headerSet(e.target.value);
    }

    function clickHandler(){
        show?
        showSet(false)
        :
        showSet(true)
    } 

    return(show?
        <div className="columnAddNotHidden">
            <input type="text" placeholder="Enter column title" onChange={changeHandler}/>
            <div className="columnAddNotHidden-flexbox">
                <button onClick={() => {
                    if(header.trim() !== '') 
                        {
                            props.addColumn(header)
                        }
                    }}>
                    {props.buttonText}
                </button>
                <div className="columnAddNotHidden-flexbox-buttonX" onClick={() => clickHandler()}>
                    X
                </div>
            </div>
        </div>
        :
        <div className="columnAddHidden" onClick={() => clickHandler()}>
            {props.panelText}
        </div>
        );
}

export default AddColumn;