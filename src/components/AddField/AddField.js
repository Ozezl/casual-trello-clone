import React,{ useState } from 'react';
import Button from '../Button/Button';

import './AddField.css';

function AddField(props){
    const [show,showSet] = useState(false);
    const [text,textSet] = useState('');

    function clickHandler(){
        show?
        showSet(false)
        :
        showSet(true)
    }
    function changeHandler(e){
        textSet(e.target.value);
    }
    return(show?
        <div className="column-hiddenDescription">
            <textarea onChange={changeHandler} placeholder="Type your text here..."></textarea>
            <div className="column-hiddenDescription-flexbox">
                <Button value={props.buttonText} createNewTodo={() => props.createNewTodo(text)}/>
                <div className="column-hiddenDescription-flexbox-button" onClick={() => clickHandler()}>
                    X
                </div>
            </div>
        </div>
        :
        <div className="column-addCard" onClick={() => clickHandler()}>
            {props.panelText}
        </div>
    );
}
export default AddField;