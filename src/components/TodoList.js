import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TodoList.css';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editPriority, setEditPriority] = useState('Medium');
    const [editDueDate, setEditDueDate] = useState('');

    const startEditing = (todo) => {
        setEditId(todo.id);
        setEditText(todo.title);
        setEditPriority(todo.priority);
        setEditDueDate(todo.dueDate || '');
    };

    const handleEditSave = () => {
        if (editText.trim()) {
            editTodo(editId, editText, editPriority, editDueDate);
        }
        setEditId(null);
        setEditText('');
        setEditPriority('Medium');
    };

    const getPriorityClass = (priority) => {
        const valid = ['Low', 'Medium', 'High'];
        return valid.includes(priority) ? `priority-${priority.toLowerCase()}` : '';
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleEditSave();
        if (e.key === 'Escape') {
            setEditId(null);
            setEditText('');
            setEditPriority('Medium');
        }
    };

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`${getPriorityClass(todo.priority)} ${todo.completed ? 'completed' : ''}`}
                >
                    {editId === todo.id ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="edit-input"
                                autoFocus
                            />
                            <input
                                type="date"
                                value={editDueDate}
                                onChange={(e) => setEditDueDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="edit-due-date"
                            />
                            <select
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value)}
                                className="edit-priority"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div className="actions">
                                <button onClick={handleEditSave} className="save-btn">
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span
                                className="todo-title"
                                onClick={() => toggleTodo(todo.id)}
                                title="Click to toggle complete"
                            >
                                {todo.title}
                            </span>

                            <small>[{todo.priority}]</small>

                            <div className="todo-meta">
                                {todo.dueDate && (
                                    <div className="due-date">
                                        Due: {new Date(todo.dueDate).toLocaleDateString('en-US')}
                                    </div>
                                )}
                                <div className="created-at">
                                    Created: {new Date(todo.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="actions">
                                <button onClick={() => startEditing(todo)} className="edit-btn">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
