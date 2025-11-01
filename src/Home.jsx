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

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos/get');
        if (response.data) {
          setTodos(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        setTodos([]);
      }
    };

    fetchTodos(); // initial load
    const intervalId = setInterval(fetchTodos, 2000); // refresh every 2s
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
            <div className="task-content">
              <h3>{todo.task}</h3>
              <BsCircle className="status-icon" />

            </div>
            <div>
              <span><BsFillTrashFill className="delete-icon" /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
