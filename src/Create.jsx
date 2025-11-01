import React from 'react';
import './App.css';

function Create() {
  return (
    <div className="create">
      <input type="text" placeholder="Enter a todo..." />
      <button type="button">Add</button>
    </div>
  );
}

export default Create;
