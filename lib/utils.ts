import { LucideIcon } from 'lucide-react';

/**
 * Represents a task in the to-do application.
 */
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

/**
 * Represents an error with a message.
 */
export type AppError = {
  message: string;
};

/**
 * Generates a unique identifier for a task.
 * @returns {string} A unique identifier.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Toggles the completion status of a task.
 * @param {Task} task - The task to toggle.
 * @returns {Task} The updated task with toggled completion status.
 */
export function toggleTaskCompletion(task: Task): Task {
  return { ...task, completed: !task.completed };
}

/**
 * Formats a date to a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Handles errors by logging them and returning a user-friendly message.
 * @param {unknown} error - The error to handle.
 * @returns {AppError} An object containing a user-friendly error message.
 */
export function handleError(error: unknown): AppError {
  console.error('An error occurred:', error);
  return { message: 'Something went wrong. Please try again later.' };
}

/**
 * Retrieves an icon component from Lucide React icons.
 * @param {string} iconName - The name of the icon.
 * @returns {LucideIcon | null} The icon component or null if not found.
 */
export function getIcon(iconName: string): LucideIcon | null {
  try {
    const Icon = require('lucide-react')[iconName];
    return Icon ? Icon : null;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export {
  generateUniqueId,
  toggleTaskCompletion,
  formatDate,
  handleError,
  getIcon
};