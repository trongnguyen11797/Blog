import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FooterLayout from './layout/Footer';
import HeaderLayout from './layout/Header';

import blogApi from './api/blog/blogApi';
import { useAppDispatch } from './store/hooks';
import { saveBlogLists, saveTotal } from './store/reducer/blog';
import Blog from './page/Blog';
import BlogDetail from './page/BlogDetail';

import './assets/scss/app.scss';

const App = () => {
  // Config route

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBlogLists = async () => {
      const resp = await blogApi.fetchBlogLists();

      if (!resp.error) {
        dispatch(saveBlogLists(resp));
        dispatch(saveTotal(resp.length));
      } else {
        dispatch(saveBlogLists(null));
        dispatch(saveTotal(0));
      }
    };

    fetchBlogLists();
  }, []);

  return (
    <Router>
      <div className='container__wrapper'>
        <HeaderLayout />
        <main className='content'>
          <Routes>
            <Route index element={<Blog />} />
            <Route path=':blogId' element={<BlogDetail />} />
          </Routes>
        </main>
        <FooterLayout />
      </div>
    </Router>
  );
};

export default App;
