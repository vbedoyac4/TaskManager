import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  userId: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.id; 
      localStorage.setItem('token', action.payload.token); 
      localStorage.setItem('userId', action.payload.id); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null; 
      localStorage.removeItem('token'); 
      localStorage.removeItem('userId'); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
