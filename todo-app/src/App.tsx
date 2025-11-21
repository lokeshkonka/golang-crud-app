import { useEffect, useState } from 'react';
import { ListTodo } from 'lucide-react';
import type { Todo } from './types/todo';
import { todosApi } from './api/todos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todosApi.getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (body: string) => {
    try {
      setError(null);
      const newTodo = await todosApi.createTodo(body);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to create todo.');
      console.error('Error creating todo:', err);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      setError(null);
      await todosApi.updateTodo(id);
      // Update local state
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setError(null);
      await todosApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <ListTodo className="header-icon" />
            <h1>Todo App</h1>
          </div>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="close-error">
              ×
            </button>
          </div>
        )}

        <div className="card">
          <AddTodo onAdd={handleAddTodo} disabled={loading} />
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </div>

        <footer className="footer">
          <p>
            {todos.length > 0 &&
              `${todos.filter((t) => !t.completed).length} of ${
                todos.length
              } tasks remaining`}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
