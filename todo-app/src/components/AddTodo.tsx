import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (body: string) => void;
  disabled?: boolean;
}

export const AddTodo = ({ onAdd, disabled }: AddTodoProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          disabled={disabled}
        />
        <button
          type="submit"
          className="add-button"
          disabled={!inputValue.trim() || disabled}
          aria-label="Add todo"
        >
          <Plus className="icon" />
          Add
        </button>
      </div>
    </form>
  );
};
