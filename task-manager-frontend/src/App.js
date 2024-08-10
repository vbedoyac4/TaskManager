import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import TaskForm from './components/TaskForm';
import ProtectedRouteWrapper from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRouteWrapper>
              <TaskList />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <ProtectedRouteWrapper>
              <TaskForm />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRouteWrapper>
              <TaskForm />
            </ProtectedRouteWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
