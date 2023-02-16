import { Link } from 'react-router-dom';

import LinkConstant from 'src/common/constant';

const NotFoundDataComponent = () => (
  <div className='notfound d-flex flex-column align-items-center justify-content-center'>
    <img src='https://vrstyler.tainguyenviet.com/static/images/result-empty.png' alt='' />
    <h3>Not found blog article</h3>

    <Link to={LinkConstant.blog}>
      <button type='button' className='btn btn-primary mt-3'>
        Black
      </button>
    </Link>
  </div>
);

export default NotFoundDataComponent;
