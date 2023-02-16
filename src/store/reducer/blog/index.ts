import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { BlogListType } from 'src/models/blog.model';
import { PAGE_LIMIT } from 'src/common/constant';

// Define a type for the slice state
interface blogState {
  total: number;

  blogPagination: BlogListType[] | null;
  loadingBlogPag: boolean;

  loadingCreate: boolean;
}

// Define the initial state using that type
const initialState: blogState = {
  // Total data
  total: 0,

  // blogPagination
  blogPagination: null,
  loadingBlogPag: true,

  // create blog
  loadingCreate: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Get total data
    getTotalDataSuccessReducer: (state, action: PayloadAction<BlogListType[] | null>) => {
      const currentState = state;
      currentState.total = action.payload?.length || 0;
    },
    getTotalDataFailedReducer: (state) => {
      const currentState = state;
      currentState.total = 0;
    },

    // Get blog pagination
    getBlogPagReducer: (state) => {
      const currentState = state;
      currentState.loadingBlogPag = true;
    },
    getBlogPagSuccessReducer: (state, action: PayloadAction<BlogListType[] | null>) => {
      const currentState = state;
      currentState.blogPagination = action.payload;
      currentState.loadingBlogPag = false;
    },
    getBlogPagFailedReducer: (state) => {
      const currentState = state;
      currentState.loadingBlogPag = false;
    },

    // Create blog
    createBlogReducer: (state) => {
      const currentState = state;
      currentState.loadingCreate = true;
    },
    createBlogSuccessReducer: (state, action: PayloadAction<
      {newData: BlogListType | null; page: number}
      >) => {
      const { newData, page } = action.payload;
      const currentState = state;
      currentState.total += 1;

      // Check current page === total pagination
      // If page < total pages => push data blogPagination
      if (page === Math.ceil(currentState.total / PAGE_LIMIT)) {
        if (currentState.blogPagination && currentState.blogPagination.length < PAGE_LIMIT) {
          currentState.blogPagination.push(newData as BlogListType);
        }
      }

      currentState.loadingCreate = false;
    },
    createBlogFailedReducer: (state) => {
      const currentState = state;
      currentState.loadingCreate = false;
    },
  },
});

export const {
  getTotalDataSuccessReducer,
  getTotalDataFailedReducer,

  getBlogPagReducer,
  getBlogPagSuccessReducer,
  getBlogPagFailedReducer,

  createBlogReducer,
  createBlogSuccessReducer,
  createBlogFailedReducer,
} = blogSlice.actions;

export default blogSlice.reducer;
