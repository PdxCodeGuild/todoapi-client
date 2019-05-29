import React from "react";
import axios from "axios";

import "./List.css";

const Item = (props) => {
  const [item, setItem] = React.useState(props.item);

  const setChecked = async (event) => {
    const { data } = await axios.patch(
      `http://localhost:4000/item/${props.item._id}`,
      {
        completed: event.target.checked,
      }
    );

    setItem(data);
  };

  return (
    <div className="item">
      <div className="task">{item.task}</div>
      <input className="completed" type="checkbox" onChange={setChecked} checked={item.completed} />
      <span 
        role="img" 
        aria-label="Delete" 
        className="close" 
        onClick={props.onDelete}
      >
        ❌
      </span>
    </div>
  );
};

Item.defaultProps = {
  onDelete: () => {},
};

const List = (props) => {
  const [list, setList] = React.useState(null);
  const [text, setText] = React.useState('');

  const getList = React.useCallback(async () => {
    setTimeout(async () => {
      const { data } = await axios.get(`http://localhost:4000/list/${props._id}`);
      setList(data);

    }, 500);

  }, [props._id]);

  const createItem = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4000/item`, {
      task: text,
      list: list._id,
    });

    getList();
    setText('');
  };

  const deleteItem = async (_id) => {
    await axios.delete(`http://localhost:4000/item/${_id}`);

    console.log(_id);
    getList();
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  React.useEffect(() => {
    getList();
  }, [getList]);

  return (
    <>
      {!list && (<div>
        <div className="loading">
          <div className="loading-indicator">Loading...</div>
        </div>
      </div>)}
      {list && (
        <div className="list">
          <div className="title">
            {list.name}
          </div>
          <form className="create" onSubmit={createItem}>
            <input className="input" type="text" onChange={handleInputChange} value={text} />
            <button className="submit">Add Item</button>
          </form>
          <div>
            {list.items.length === 0 && (<div className="no-items">No items</div>)}
            {list.items.map((item) => <Item key={item._id} item={item} onDelete={() => deleteItem(item._id)} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default List;