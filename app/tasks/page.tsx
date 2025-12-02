'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post('/api/tasks', { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch {
      setError('Failed to add task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          <PlusCircle size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center p-2 border rounded-md">
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;