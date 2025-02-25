import React from 'react';

export default function Item(props) {
  return (
    <div>
      <div className={`item ${props.item.completed ? 'completed' : ''}`}>
        <p>{props.item.text}</p>
        <div className='buttons'>
          <button onClick={() => props.onComplete(props.idx)}>
            {props.item.completed ? 'Undo' : 'Complete'}
          </button>
          <button 
            onClick={() => props.onChange(props.idx)}
            disabled={props.item.completed}
            title={props.item.completed ? 'Undo completion to edit' : ''}
          >
            ✏️
          </button>
          <button onClick={() => props.onDelete(props.idx)}
           disabled={props.item.completed} 
           title={props.item.completed ? 'Undo completion to delete' : ''}>🗑️</button>
        </div>
      </div>
    </div>
  );
}
