import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './components/Column/Column';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import AddColumn from './components/AddColumn/AddColumn';
import AddField from './components/AddField/AddField';
import * as serviceWorker from './serviceWorker';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'; 
import './index.css';

function Trello(){
    
    const [items,itemsSet] = useState([]);

    function addItem(newTodo,columnId){
      itemsSet(items.map(val => {
        if(val.columnId === columnId){
          val.todos.push({
            text: newTodo,
            id:Number(val.todos.length + 1)
          })
        }
        return val;
      }));
    }

    function addColumn(header){
      let tmp = [...items,
        {
          header: header,
          todos:[],
          columnId:Number(items.length + 1)
        }
      ];

      tmp = tmp.map((curr,index) => {
        return {...curr,columnId:Number(index+1)}
      });

      itemsSet(tmp);
    }

    function deleteItem(id,columnId){   //couldn't implement no loop solution
      let tmp = [...items];             //future me,please do ;)
      for(let i = 0;i<tmp.length;i++){
        if(tmp[i].columnId === columnId){
          tmp[i].todos = tmp[i].todos.filter(curr => curr.id !== id);
        }   
      }

      tmp = tmp.map(curr =>
        {
          if(curr.columnId === columnId){
            return(
              {
                ...curr,
                todos: curr.todos.map((val,index) => {
                  return ({
                    ...val,
                    id:Number(index + 1) //here
                  })
                })
              }
            );}
            else{
              return curr;
            } 
        })
     itemsSet(tmp);
    }

    function deleteColumn(columnId){
       let tmp = items.filter((val,index) => {
        if(val.columnId !== columnId) return {...val,columnId:Number(index + 1)};
      });

      itemsSet(tmp);
    }

    //drag and drop
    function onDragEnd(result){
      const {destination, source, draggableId, type} = result;

      if(!destination) return;
      
      if(destination.droppableId === source.droppableId && destination.index === source.index) return;

      if(type === 'column'){
        const newItems = Array.from(items);
        newItems.splice(source.index,1);
        newItems.splice(destination.index,0,items[Number(draggableId.slice(6))-1]);
      
          const tmp = newItems.map((curr,index) =>{
            return{
              ...curr,
              columnId:Number(index + 1)
            };
          });
          
          itemsSet(tmp);
        
        return;
      }

     //columns
      const start = items[Number(source.droppableId) - 1]; 
      const finish = items[Number(destination.droppableId)- 1]; 

      if(start === finish){
        const newTodos = Array.from(start.todos);
        
        newTodos.splice(source.index,1);
        console.log(Number(draggableId.slice(5)));
        newTodos.splice(destination.index,0,start.todos[Number(draggableId.slice(5))-1]);
        
        start.todos = newTodos.map((curr,index) => 
          {
            return {
              ...curr,
              id:Number(index + 1), //here
            }
          }  
        );

        const newItems = items.map(curr => {
          if(curr.columnId === start.columnId){
            return start;
          }
          else{
            return curr;
          }
        })
  
        itemsSet(newItems);
        return;
      }

      //start column changes
      const startTodos = Array.from(start.todos);
      startTodos.splice(source.index,1);

      //sort todos in a start column
      const startUpd = 
        {
          ...start,
          todos:startTodos.map((curr,index) => {
            return{...curr,id:Number(index+1)} //change here
          })
        }
      
      //finish column changes
      const finishTodos = Array.from(finish.todos);
      finishTodos.splice(destination.index,0,start.todos[Number(draggableId.slice(5)) -1]); 

      //sort todos in a finish column
      const finishUpd = 
        {
          ...finish,
          todos:finishTodos.map((curr,index) => {
            return{...curr,id:Number(index+1)}  //here
          })
        }
        
      itemsSet(items.map((val,index) => {
        if(index === Number(source.droppableId) - 1 ){ 
          return startUpd;
        }
        if(index === Number(destination.droppableId) - 1){ 
          return finishUpd;
        }
        else{
          return val;
        }
      }));
    }

    return (
        <div className="wrapper">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId = "smpl" direction="horizontal" type="column">
              {provided => (
                <div className="container" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((curr,index) =>
                  (
                      <Column key={curr.columnId} id={curr.columnId} index={index}>   
                        <Header value={curr.header} columnId={curr.columnId} deleteColumn={(columnId) => deleteColumn(columnId)}/>
                        <Droppable droppableId={curr.columnId.toString()} type="task">
                          {provided => (
                            <div className="overflowCards" ref={provided.innerRef} {...provided.droppableProps}>
                              {curr.todos.map((val,index) => 
                                (<Card key={val.id} value={val.text} id={val.id} index={index} columnId={curr.columnId} deleteItem={(id,columnId) => deleteItem(id,columnId)}/>)       
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <AddField createNewTodo={(text)=> addItem(text,curr.columnId)} buttonText="Add Card" panelText="+ Add a card"/>
                      </Column>
                ))}
                {provided.placeholder}
                </div>
              )}
            </Droppable>  
          </DragDropContext>    
            <AddColumn buttonText="Add Column" panelText="+ Add a column" addColumn={(header) => addColumn(header)}/>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <Trello />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

