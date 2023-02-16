import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FooterLayout from './layout/Footer';
import HeaderLayout from './layout/Header';

import { LINK_CONSTANT } from './common/constant';

import Blog from './page/Blog';
import BlogDetail from './page/BlogDetail';

import './assets/scss/app.scss';

const App = () => (
  <Router>
    <div className='container__wrapper'>
      <HeaderLayout />
      <main className='content'>
        <Routes>
          <Route index element={<Blog />} />
          <Route path={LINK_CONSTANT.blogDetail} element={<BlogDetail />} />
        </Routes>
      </main>
      <FooterLayout />
    </div>
  </Router>
);
export default App;
