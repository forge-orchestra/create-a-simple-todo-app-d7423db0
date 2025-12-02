"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { Task } from '@/types';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/services/taskService';
import 'tailwindcss/tailwind.css';

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const task = await createTask(newTask);
      setTasks([...tasks, task]);
      setNewTask('');
    } catch {
      setError('Failed to add task');
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      const updatedTask = await updateTask(id);
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} className="ml-2 p-2 bg-blue-500 text-white rounded">
          <PlusCircle />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center p-2 border rounded">
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleToggleTask(task.id)} className="text-green-500">
                <CheckCircle />
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="text-red-500">
                <XCircle />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;