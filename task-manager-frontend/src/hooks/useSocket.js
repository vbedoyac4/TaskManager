import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../features/tasks/taskSlice';

const socket = io('https://localhost:7090'); 
function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('taskAdded', (task) => {
      dispatch(addTask(task));
    });

    socket.on('taskUpdated', (task) => {
      dispatch(updateTask(task));
    });

    socket.on('taskDeleted', (taskId) => {
      dispatch(deleteTask(taskId));
    });

    return () => {
      socket.off('taskAdded');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [dispatch]);

  return socket;
}

export default useSocket;
