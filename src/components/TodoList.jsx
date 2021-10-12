import React from 'react'
import SingleTodo from './SingleTodo'
import "../styles/css/TodoList.css";

function TodoList({todos, doTodo, deleteTodo}) {
    
    return (
      // <html>{javascript is here !!! }</html>
        <div className="todoList">
            {todos.map((todo) => (                
                <SingleTodo key={todo.id} todo={todo} doTodo={doTodo} deleteTodo = {deleteTodo} />
            ))}
        </div>
    )
}


export default TodoList
