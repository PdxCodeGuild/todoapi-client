import React from 'react';

import axios from 'axios';
import List from './List';


const App = () => {
  const [lists, setLists] = React.useState([]);

  const getLists = async () => {
    const { data } = await axios.get('http://localhost:4000/list');
    setLists(data);
    console.log(data);
  };

  React.useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      {lists.map((list) => <List key={list._id} _id={list._id} />)}
    </div>
  );
};

export default App;
