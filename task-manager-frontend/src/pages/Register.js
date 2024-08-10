import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

axios.defaults.baseURL = 'https://localhost:7090';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(/[@$!%*?&#^()_+[\]{};':"|,.<>/?\\-]/, 'Password must include at least one special character')
    .required('Password is required'),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        await axios.post('/api/auth/register', values);
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-blue">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="mt-10 mb-3 text-center text-3xl font-sans font-bold-400 leading-9 tracking-tight text-l-blue">
          Register to Task Manager
        </h1>
        <form onSubmit={formik.handleSubmit}>
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
                className="w-full px-3 py-2 border-none outline-none"
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
                className="w-full px-3 py-2 border-none outline-none"
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
          <button
            type="submit"
            className={`w-full mb-2 py-2 px-4 text-white font-bold rounded-md ${formik.isValid && formik.dirty ? 'bg-l-blue hover:bg-blue' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!formik.isValid || !formik.dirty}
          >
            Register
          </button>
          <p className="text-center font-sans text-gray-600">
            Already have an account? <a href="/login" className="text-blue">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
