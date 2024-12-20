import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import './App.css'; // Import your CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Update localStorage whenever the todos list changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Add Todo
  const addTodo = () => {
    if (input) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  // Remove Todo
  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Move Todo Up
  const moveUp = (index) => {
    if (index > 0) {
      const updatedTodos = [...todos];
      const [removed] = updatedTodos.splice(index, 1);
      updatedTodos.splice(index - 1, 0, removed);
      setTodos(updatedTodos);
    }
  };

  // Move Todo Down
  const moveDown = (index) => {
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const [removed] = updatedTodos.splice(index, 1);
      updatedTodos.splice(index + 1, 0, removed);
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="app">
      <div className="to-do-list">
        <h1 className="header">To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new task"
            className="input-box"
          />
          <button onClick={addTodo} className="add-button">Add</button>
        </div>

        <div className="task-list">
          {todos.map((todo, index) => (
            <div key={index} className="task-item">
              <span className="task-text" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
              </span>
              <div className="task-actions">
                <button onClick={() => removeTodo(index)} className="action-button delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button onClick={() => moveUp(index)} className="action-button" disabled={index === 0}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button onClick={() => moveDown(index)} className="action-button" disabled={index === todos.length - 1}>
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
