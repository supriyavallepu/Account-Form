// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
