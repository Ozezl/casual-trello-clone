import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './components/Column/Column';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import AddField from './components/AddField/AddField';
import * as serviceWorker from './serviceWorker';
import logo from './logo.svg';
import './index.css';

function Trello(){
    const [header,headerSet] = useState('Example');
    const [items,itemsSet] = useState([]);
    function addItem(newTodo){
      itemsSet([...items,
        {
          text: newTodo,
          id: items.length+1
        }
      ]);
      console.log(items);
    }
    return (
        <div className="wrapper">
            <Column>
                <Header value={header}/>
                <div className="overflowCards">
                  {items.map((curr) => 
                    (<Card value={curr.text}/>)
                  )}
                </div>
                <AddField createNewTodo={(text)=> addItem(text)} buttonText="Add Card" panelText="+ Add a card"/>
            </Column>
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

