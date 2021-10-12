import { useState } from 'react';
import './styles/css/App.css';
import TodoForm from "./components/TodoForm.jsx";
import TodoList from './components/TodoList';

function App() {  
  const [todos, setTodos] = useState([]);
  // value = useState(initialValue)
  // setValue -> function to change value
  
  const addTodo = (task) => {
    const obj = {
      id: Date.now(),
      task,
      // task: task,
      done: false
    }
    // REACT : NEVER UPDATE STATE VARIABLE BY ASSIGNMENT(=) 👿
    // const newTodos = [...todos]; // spread operator 
    // newTodos.push(obj)    
    setTodos([...todos, obj]);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos)
  }

  const doTodo = (id) => {
    const newTodos = [...todos];
    for (let i=0; i<newTodos.length; ++i) {
      if (newTodos[i].id === id) {
        newTodos[i].done = ! newTodos[i].done;
      }
    }
    setTodos(newTodos);
  }
  
  return (
    <div className="app">
      <h1>Todo List 📃</h1>
      {/* main container */}
      <div className='container'>
        {/* form */}
        <TodoForm addTodo={addTodo} />

        {/* list */}
        <TodoList todos={todos}  doTodo={doTodo} deleteTodo = {deleteTodo}/>
      {/* main container */}
      </div>
    </div>
  );
}

export default App;
