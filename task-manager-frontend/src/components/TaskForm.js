import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, fetchTasks } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'https://localhost:7090';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

function TaskForm({ task, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: task ? task.title : '',
      description: task ? task.description : '',
      imagePath: task ? task.imagePath : '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const now = new Date().toISOString();
        const updatedValues = {
          ...values,
          userId: localStorage.getItem('userId'),
          updatedAt: now, 
        };

        if (task) {
          console.log('Updating task:', updatedValues);
          console.log('Task ID:', task.id);
          await axios.put(`/api/task/${task.id}`, updatedValues, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          dispatch(updateTask({ ...task, ...updatedValues }));
        } else {
          const newTask = {
            ...updatedValues,
            createdAt: now, 
          };
          console.log('Adding new task:', newTask);
          const response = await axios.post('/api/task', newTask, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          dispatch(addTask(response.data));
        }

        dispatch(fetchTasks());

        onClose();
        navigate('/tasks');
      } catch (error) {
        console.error('Task submission error:', error.response ? error.response.data : error.message);
      }
    },
  });

  useEffect(() => {
    if (task && task.id) {         
      axios.get(`/api/task/${task.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        console.log('Fetched task:', response.data);
        formik.setValues({
          id: response.data.id,
          userId: response.data.userId,
          title: response.data.title,
          description: response.data.description,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          imagePath: response.data.imagePath,
        });
      })
      .catch(error => {
        console.error('Error fetching task:', error.response ? error.response.data : error.message);
      });
    }
  }, [task]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-green mb-6 text-center font-sans">{task ? 'Edit Task' : 'Add Task'}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm  text-green font-sans">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="mt-1 block w-full px-3 py-2 border border-green rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            {formik.errors.title ? (
              <div className="text-red font-sans text-sm">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm text-green font-sans ">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-green rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="imagePath" className="block text-sm text-green font-sans">Image URL</label>
            <input
              id="imagePath"
              name="imagePath"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.imagePath}
              className="mt-1 block w-full px-3 py-2 border border-green rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            {formik.errors.imagePath ? (
              <div className="text-red-600 text-sm">{formik.errors.imagePath}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green text-white font-sans rounded-md hover:bg-l-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-red text-white font-sans rounded-md hover:bg-l-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

