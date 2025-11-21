import { CheckSquare } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="empty-state">
      <CheckSquare className="empty-icon" />
      <h3>No todos yet</h3>
      <p>Add your first todo to get started!</p>
    </div>
  );
};
