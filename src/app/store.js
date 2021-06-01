import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postsSlice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
  middleware: [thunk, logger]
});
