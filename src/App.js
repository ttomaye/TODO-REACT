import './App.css';
import { useEffect, useReducer, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          ...action.payload,
          id: Date.now(),
          completed: false,
          createdAt: new Date().toISOString()
        }
      ];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'EDIT':
      return state.map(todo =>
        todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
            priority: action.payload.priority,
            dueDate: action.payload.dueDate,
          }
          : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

function App() {
  const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'e') {
        alert('Ctrl+E pressed — example shortcut');
      }
      if (e.ctrlKey && e.key === 'd') {
        alert('Ctrl+D pressed — maybe open the add todo form?');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addTodo = (todo) => {
    dispatch({ type: 'ADD', payload: todo });
  };

  const editTodo = (id, newTitle, newPriority, newDueDate) => {
    dispatch({
      type: 'EDIT',
      payload: {
        id,
        title: newTitle,
        priority: newPriority,
        dueDate: newDueDate,
      },
    });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (priorityFilter !== 'all') return todo.priority === priorityFilter;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityMap = { Low: 1, Medium: 2, High: 3 };
          return priorityMap[b.priority] - priorityMap[a.priority];
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  };

  return (
    <div className="App">
      <h1>React Todo App</h1>

      <div className="controls">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <TodoStats todos={todos} />
    </div>
  );
}

export default App;
