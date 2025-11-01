// import React, { useState,useEffect } from 'react';
// import Create from './Create';
// import './App.css';
// import axios from 'axios';

// function Home() {
//   const [todos, setTodos] = useState([]);
//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/get');
//         if (response.data) {
//           setTodos(Array.isArray(response.data) ? response.data : []);
//         }
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//         setTodos([]);
//       }
//     };

//     fetchTodos(); // initial load
//     const intervalId = setInterval(fetchTodos, 2000); // poll for updates

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="todo-container">
//       <h1>Todo List</h1>
//       <Create />
//       {todos.length === 0 ? (
//         <div className="no-record"><h2>No Record</h2></div>
//       ) : (
//         todos.map((todo, index) => (
//           <div className="todo-item" key={todo._id || index}>
//             <div className="task-content">
//               <h3>{todo.task}</h3>
//               {todo.description && <p>{todo.description}</p>}
//               <span className="task-date">
//                 {new Date(todo.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { FaRegCircle, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos/get');
      setTodos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/delete/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // ✅ Toggle completion
  const handleToggle = async (id, currentState) => {
    try {
      const newState = !currentState;
      await axios.put(`http://localhost:3001/todos/update/${id}`, { completed: newState });

      // Update UI immediately
      setTodos(prev =>
        prev.map(todo =>
          todo._id === id ? { ...todo, completed: newState } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    const intervalId = setInterval(fetchTodos, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <Create />

      {todos.length === 0 ? (
        <div className="no-record"><h2>No Record</h2></div>
      ) : (
        todos.map((todo, index) => (
          <div className="todo-item" key={todo._id || index}>
            <div className="todo-row">
              {/* Left Circle Icon */}
              <div className="icon-left" onClick={() => handleToggle(todo._id, todo.completed)}>
                {todo.completed ? (
                  <FaCheckCircle className="circle-icon completed-icon" />
                ) : (
                  <FaRegCircle className="circle-icon" />
                )}
              </div>

              {/* Task Content */}
              <div className={`task-content ${todo.completed ? 'completed' : ''}`}>
                <h3>{todo.task}</h3>
                <span className="task-date">
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleDateString()
                    : "No Date"}
                </span>
              </div>

              {/* Delete Icon */}
              <div className="icon-right" onClick={() => handleDelete(todo._id)}>
                <FaTrashAlt className="delete-icon" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
