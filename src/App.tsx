import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FooterLayout from './layout/Footer';

import HeaderLayout from './layout/Header';

import Blog from './page/Blog';

import './assets/scss/app.scss';

const App = () => {
  // Config route
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Blog />,
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
