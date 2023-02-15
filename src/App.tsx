import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FooterLayout from './layout/Footer';

import HeaderLayout from './layout/Header';

import Blog from './page/Blog';
import BlogDetail from './page/BlogDetail';

import './assets/scss/app.scss';

const App = () => {
  // Config route
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Blog />,
    },
    {
      path: '/:blogId',
      element: <BlogDetail />,
    },
  ]);

  return (
    <>
      <HeaderLayout />
      <RouterProvider router={router} />
      <FooterLayout />
    </>
  );
};

export default App;
