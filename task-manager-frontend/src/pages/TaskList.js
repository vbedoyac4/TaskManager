import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../features/tasks/taskSlice';
import TaskItem from '../components/TaskItem';
import axios from 'axios';
import useSocket from '../hooks/useSocket';
import TaskForm from '../components/TaskForm';
import { logout } from '../features/auth/authSlice'; 


axios.defaults.baseURL = 'https://localhost:7090';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const navigate = useNavigate(); // Initialize navigate


  useSocket(); 

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .then(response => {
        console.log('Fetched tasks:', response);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
      });
  }, [dispatch]);

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (taskId) => {
    axios.delete(`/api/task/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        dispatch(deleteTask(taskId));
        console.log('Task deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsAddingTask(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white m-0">
       <button
    onClick={handleLogout}
    className="px-4 py-2 bg-red text-white font-semibold rounded-md hover:bg-l-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-auto"
  >
    Logout
  </button>
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">

        <h1 className="text-center text-4xl font-bold font-sans leading-tight tracking-tight text-blue">
          Tasks
        </h1>
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-green text-white font-semibold rounded-md hover:bg-l-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Task
        </button>
      </div>
      {taskStatus === 'failed' && (
        <div className="text-red-500 mb-4">
          <p>Error fetching tasks: {error ? error.message : 'Unknown error'}</p>
        </div>
      )}
      <div className="w-full max-w-4xl">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              onUpdate={() => handleUpdate(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available</p>
        )}
      </div>
      {(isModalOpen || isAddingTask) && (
        <TaskForm 
          task={selectedTask}
          onClose={() => {
            setIsModalOpen(false);
            setIsAddingTask(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default TaskList;
