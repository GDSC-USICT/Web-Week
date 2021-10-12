import React from 'react'
import "../styles/css/SingleTodo.css";

function SingleTodo({todo, deleteTodo, doTodo}) {
    // console.log(props);
    // const todo = props.todo;
    // const {todo} = props;
    // const todo = props['todo']
    // console.log(todo);
    
    const {id, task, done}  = todo;
    
    return (
        <div className="singleTodo">
            {done ? <strike>{task}</strike> : <p>{task}</p>}
            <button onClick={() => deleteTodo(id)}>Delete</button>
            <button onClick={() => doTodo(id)}>Done / Undone</button>
        </div>
    )
}

export default SingleTodo
