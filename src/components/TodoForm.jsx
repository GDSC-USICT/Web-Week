import React, { useState } from 'react'
import "../styles/css/TodoForm.css";

function TodoForm({addTodo}) {
    const [newTodo, setNewTodo] = useState("");

    const onAddTodo = (e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
    }

  return (
    <form className="todoForm" onSubmit={onAddTodo}>  
        <input type="text" placeholder="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} required/>
        <button type="submit">Submit</button>
    </form>   
  )
}

export default TodoForm
