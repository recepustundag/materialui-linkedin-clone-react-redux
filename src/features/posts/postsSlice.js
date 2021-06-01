import { createSlice,getDefaultMiddleware } from '@reduxjs/toolkit';

getDefaultMiddleware({
  serializableCheck: false
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: []
  },
  
  reducers: {
    getPosts: (state, action) => {
      const index = state.posts.findIndex((elem, key) => elem.id == action.payload.id);
      index == -1 && state.posts.unshift(action.payload);
    },
  },
});

export const { getPosts } = postsSlice.actions;

export const posts = (state) => state.posts.posts;

export default postsSlice.reducer;