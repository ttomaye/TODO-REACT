import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTodo({ title, priority, dueDate });

        setTitle('');
        setPriority('Medium');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />

            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />

            <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
