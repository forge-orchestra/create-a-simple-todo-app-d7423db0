"use client";

import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { LucideIcon } from 'lucide-react';
import { CheckCircle, XCircle } from 'lucide-react';

const HomePage: NextPage = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate fetching tasks
        setTimeout(() => {
          setTasks(['Task 1', 'Task 2', 'Task 3']);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load tasks');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-800">Forge-app</h1>
        <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
      </header>
      <main className="max-w-2xl mx-auto">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="text-gray-700">{task}</span>
                <button className="text-green-500 hover:text-green-700">
                  <CheckCircle size={20} />
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul>
            <li className="flex items-center mb-2">
              <LucideIcon name="check-circle" size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-700">CRUD operations for tasks</span>
            </li>
            <li className="flex items-center mb-2">
              <LucideIcon name="check-circle" size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-700">User authentication</span>
            </li>
            <li className="flex items-center mb-2">
              <LucideIcon name="check-circle" size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-700">Responsive design</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default HomePage;