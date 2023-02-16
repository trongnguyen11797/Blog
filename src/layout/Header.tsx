import { Link } from 'react-router-dom';

import { LINK_CONSTANT } from 'src/common/constant';

const HeaderLayout = () => (
  <nav className='navbar navbar-light bg-light'>
    <div className='container-fluid'>
      <Link to={LINK_CONSTANT.blog}>
        <img src='https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg' width='30' height='30' alt='' />
      </Link>
    </div>
  </nav>
);

export default HeaderLayout;
