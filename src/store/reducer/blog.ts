import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { BlogListType } from 'src/models/blog.model';

import type { RootState } from '../store';

// Define a type for the slice state
interface blogState {
  blogLists: BlogListType[] | null;
  loading: boolean;
  total: number;
}

// Define the initial state using that type
const initialState: blogState = {
  blogLists: null,
  loading: true,
  total: 0,
};

export const blogSlice = createSlice({
  name: 'blog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveBlogLists: (state, action: PayloadAction<BlogListType[] | null>) => {
      const currentState = state;
      currentState.blogLists = action.payload;
    },
    CREATE_BLOG_SUCCESS: (state) => {
      const currentState = state;
      console.log('currentState', currentState);
      // currentState.value += 1;
    },
    CREATE_BLOG_PENDING: (state) => {
      const currentState = state;
      console.log('currentState', currentState);
      // currentState.value += 1;
    },
    CREATE_BLOG_FAILED: (state) => {
      const currentState = state;
      console.log('currentState', currentState);
      // currentState.value += 1;
    },
    saveTotal: (state, action: PayloadAction<number>) => {
      const currentState = state;
      currentState.total = action.payload;
    },
  },
});

export const { saveTotal, saveBlogLists } = blogSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTotal = (state: RootState) => state.blog.total;

export default blogSlice.reducer;
