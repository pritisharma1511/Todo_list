import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Create() {
  const [task, setTask] = useState('');
  const handleAdd = () => {

    axios.post('http://localhost:3001/add', { task })
      .then(response => {
        console.log("Task added:", response.data);
        setTask('');
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
  };
  return (
    <div className="create">
      <input type="text" placeholder="Enter task" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};



export default Create;
