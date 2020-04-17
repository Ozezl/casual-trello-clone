import React from 'react';
import { Draggable } from 'react-beautiful-dnd'; 
import './Column.css';

function Column(props){
        return(
            <Draggable draggableId={'column' + props.id.toString()} index={props.index}>
                {provided => (
                    <div className="column" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {props.children}
                    </div>
                )}
            </Draggable>    
        );
}

export default Column;