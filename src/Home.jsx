import React, { useState } from 'react';
import Create from './Create';
import './App.css';

function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <div className="no-record"><h2>No Record</h2></div>
      ) : (
        todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            {todo}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
