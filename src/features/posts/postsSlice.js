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
      const index = state.posts.findIndex((elem) => elem.id == action.payload.id);
      index == -1 && state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((elem) => elem.id != action.payload);
    },
    updatePost: (state, action) => {
      let index = null;
      state.posts.map((elem, key) => {
        if(elem.id == action.payload){
          index = key;
        }
      });
      state.posts[index].data.liked +=1;
    }
  },
});

export const { getPosts, deletePost,updatePost } = postsSlice.actions;

export const posts = (state) => state.posts.posts;

export default postsSlice.reducer;