import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/taskSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});
