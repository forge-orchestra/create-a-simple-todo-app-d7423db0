import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <button
          onClick={() => onToggleComplete(id)}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          className="mr-3 focus:outline-none"
        >
          {completed ? (
            <CheckCircle className="text-green-500" aria-hidden="true" />
          ) : (
            <Circle className="text-gray-400" aria-hidden="true" />
          )}
        </button>
        <span className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {title}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        <Trash2 aria-hidden="true" />
      </button>
    </div>
  );
};

export default TaskItem;