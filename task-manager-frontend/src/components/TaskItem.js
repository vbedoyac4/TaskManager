import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import axios from 'axios';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import TaskForm from './TaskForm';
import { format } from 'date-fns';

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMMM dd, yyyy');
};

function TaskItem({ task, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedCreatedAt = formatDate(task.createdAt);
  const formattedUpdatedAt = formatDate(task.updatedAt);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = () => {
    console.log('Delete Id:', task.id);
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`/api/task/${task.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(() => {
          dispatch(deleteTask(task.id));
          if (onDelete) onDelete(task.id); 
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    }
  };

  return (
    <div className="mb-4 p-4 border border-blue rounded-lg shadow-sm flex flex-col bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img
            src={task.imagePath}
            alt="Task"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <h2 
            onClick={handleToggleDetails}
            className="text-xl font-semibold font-sans text-blue cursor-pointer">
            {task.title}
          </h2>
        </div>
        {showDetails && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green text-white p-2 rounded-md"
            >
              <FaPencilAlt className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red text-white p-2 rounded-md"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {showDetails && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="font-sans text-xs text-blue uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="font-sans px-6 py-3">Description</th>
                <th scope="col" className="font-sans px-6 py-3">Creation Date</th>
                <th scope="col" className="font-sans px-6 py-3">Update Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{formattedCreatedAt}</td>
                <td className="px-6 py-4">{formattedUpdatedAt}</td>
              </tr>
            </tbody>  
          </table>
        </div>
      )}
      {isModalOpen && (
        <TaskForm
          task={task}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TaskItem;
