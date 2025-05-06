import './TodoStats.css';

function TodoStats({ todos }) {
    const total = todos.length;
    const active = todos.filter(todo => !todo.completed).length;
    const completed = total - active;
    const highestPriorityTodo = todos
        .filter(todo => !todo.completed)
        .sort((a, b) => {
            const map = { Low: 1, Medium: 2, High: 3 };
            return map[b.priority] - map[a.priority];
        })[0];

    return (
        <div className="todo-stats">
            {highestPriorityTodo && (
                <p className="priority-title">
                    Highest Priority Todo: {highestPriorityTodo.title}
                </p>
            )}
            <div className="totals">
                <p>Total: {total}</p>
                <p>Active: {active}</p>
                <p>Completed: {completed}</p>
            </div>
        </div>
    );
}

export default TodoStats;
