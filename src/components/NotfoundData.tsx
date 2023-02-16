import { Link } from 'react-router-dom';

import { linkConstant } from 'src/common/constant';

type Props = {
  title: string;
  isBack?: boolean;
};
const NotFoundDataComponent = (props: Props) => {
  const { title, isBack } = props;
  return (
    <div className='notfound d-flex flex-column align-items-center justify-content-center'>
      <img src='https://vrstyler.tainguyenviet.com/static/images/result-empty.png' alt='' />
      <h3>{title}</h3>

      {isBack && (
        <Link to={linkConstant.blog}>
          <button type='button' className='btn btn-primary mt-3'>
            Black
          </button>
        </Link>
      )}
    </div>
  );
};

export default NotFoundDataComponent;
