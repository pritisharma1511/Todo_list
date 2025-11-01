import React from 'react';
import { useState } from 'react';
import './App.css';

const Create = () => {
  const [task, setTask] = useState('');
  const handleAdd = () => {
    // Functionality to add a new task will be implemented here
  };
  return (
    <div className="create">
      <input type="text" placeholder="Enter task" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

function Create() {
  return (
    <div className="create">
      <input type="text" placeholder="Enter task" />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
