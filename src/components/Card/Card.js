import React from 'react';
import Delete from '../Delete/Delete';
import { Draggable } from 'react-beautiful-dnd'; 
import './Card.css';

function Card(props){
    return(
        <Draggable draggableId={props.columnId.toString() + 'card' + props.id.toString()} index={props.index}>
            {(provided) => (
                <div className="card" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {props.value}
                    <Delete deleteItem={() => props.deleteItem(props.id,props.columnId)}/>
                </div>
            )}
        </Draggable>    
    );
}

export default Card;