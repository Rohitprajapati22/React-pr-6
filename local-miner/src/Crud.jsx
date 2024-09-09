import React, { useState, useEffect } from 'react';
import './crud.css'

const Crud = () => {
    const [todo, setTodo] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);


    const getData = () => {
        let data = JSON.parse(localStorage.getItem('todo')) || [];
        return data;
    };

    const [record, setRecord] = useState(getData());


    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(record));
    }, [record]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!todo) {
            alert("Please add a task first.");
            return;
        }

        let obj = {
            id: Math.floor(Math.random() * 1000),
            todo,
            dep: taskDescription,
            date:new Date().toISOString().split("T")[0],
        };

        if (editTaskId) {
            setRecord(record.map((task) => (task.id === editTaskId ? obj : task)));
            setEditTaskId(null);
        } else {
            setRecord([...record, obj]);
        }

        setTodo("");
        setTaskDescription("");
    };

    const deleteTodo = (id) => {
        let updatedRecord = record.filter((val) => val.id !== id);
        setRecord(updatedRecord);
    };

    const editTodo = (id, todo, description) => {
        setTodo(todo);
        setTaskDescription(description);
        setEditTaskId(id);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h2>Todo App</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Add new Task' onChange={(e) => setTodo(e.target.value)} value={todo} />
                            <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                            <button type="submit">
                                {editTaskId ? "Update Task" : "Add Task"}
                            </button>
                        </form>
                    </div>
                </div>

                <h2>Tasks</h2>
                <div className="task-app">
                    {
                        record.map((val) => (
                            <div key={val.id}>
                                <div className="task">
                                    <div className="task-body">
                                        <h3>{val.todo}</h3>
                                        <p>{val.date}</p>
                                        <p>{val.dep}</p>
                                        <div  className="task-action">
                                            <button className='btn' onClick={() => deleteTodo(val.id)}>Delete</button>
                                            <button className='btn' onClick={() => editTodo(val.id, val.todo, val.dep)}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Crud;
