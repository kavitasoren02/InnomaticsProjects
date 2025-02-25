
import React, { useState } from 'react';
import Item from './Item';

export default function Text() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [selectIdx, setSelectIdx] = useState(-1);

  const onChangeHandler = (event) => {
    setText(event.target.value);
  };

  const Submithandler = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      if (selectIdx !== -1) {
        // Update an existing task
        setItems(
          items.map((item, idx) =>
            idx === selectIdx ? { ...item, text } : item
          )
        );
        setSelectIdx(-1);
      } else {
        setItems([...items, { text, completed: false }]);
      }
      setText('');
    }
  };


  const handleDelete=(idx)=>{
    const updatedItems = [...items];  
    updatedItems.splice(idx, 1);      
    setItems(updatedItems);   
}
  const handleEdit = (idx) => {
    setSelectIdx(idx);
    setText(items[idx].text);
  };

  const handleComplete = (idx) => {
    setItems(
      items.map((item, i) =>
        i === idx ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div>
      <div className='todo'>
        <h1 className='heading'>TODO APPLICATION</h1>
        <div className="lists">
          {items.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              idx={idx}
              onDelete={handleDelete}
              onChange={handleEdit}
              onComplete={handleComplete}
            />
          ))}
        </div>
        <div className="addItem">
          <form onSubmit={Submithandler}>
            <input
              type="text"
              value={text}
              placeholder='Enter text here....'
              onChange={onChangeHandler}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
