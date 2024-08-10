import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

axios.defaults.baseURL = 'https://localhost:7090';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/auth/login', values);
        const { token, userId } = response.data;

        dispatch(login({
          user: { id: userId, email: values.email }, 
          token,
        }));

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        console.log('Login successful:', response.data);

        navigate('/tasks');
      } catch (error) {
        console.error('Login failed:', error);
        setLoginError(error.response ? error.response.data.message : 'Login failed. Please try again.');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="mt-10 mb-3 text-center text-3xl font-sans font-bold-400 leading-9 tracking-tight text-l-blue">Task Manager Login</h1>
        <form onSubmit={formik.handleSubmit}>
          {loginError && (
            <div className="mb-4 text-red font-sans text-sm">
              {loginError}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-sans text-gray">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaEnvelope className="text-l-blue m-2" />
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="mt-1 block w-full px-3 py-2 border-none outline-none"
                placeholder="Enter your email"
              />
            </div>
            {formik.errors.email ? <div className="text-red font-sans text-sm">{formik.errors.email}</div> : null}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-sans text-gray">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
              <FaLock className="text-l-blue m-2" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.password}
                className="mt-1 block w-full px-3 py-2 border-none outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-l-blue m-2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.errors.password ? <div className="text-red font-sans text-sm">{formik.errors.password}</div> : null}
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-l-blue text-white font-bold rounded-md hover:bg-blue">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
