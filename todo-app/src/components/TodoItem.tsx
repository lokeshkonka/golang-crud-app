import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="todo-item">
      <button
        className="todo-checkbox"
        onClick={() => todo.id && onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? (
          <CheckCircle2 className="icon icon-checked" />
        ) : (
          <Circle className="icon icon-unchecked" />
        )}
      </button>
      
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.body}
      </span>
      
      <button
        className="todo-delete"
        onClick={() => todo.id && onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <Trash2 className="icon" />
      </button>
    </div>
  );
};
