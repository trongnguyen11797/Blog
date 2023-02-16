import { memo } from 'react';
import { Link } from 'react-router-dom';
import LinkConstant from 'src/common/constant';
import { BlogListType } from 'src/models/blog.model';

type Props = {
  data: BlogListType;
};

const BlogListComponent = (props: Props) => {
  const { data } = props;
  return (
    <li className='media'>
      <Link to={`${LinkConstant.blog}/${data.id}`}>
        <img src={data.image} className='mr-3' width={64} height={64} alt='...' loading='lazy' />
      </Link>
      <div className='media-body'>
        <Link to={data.id}>
          <h5 className='mt-0 mb-1 media__title'>{data.title}</h5>
        </Link>
        <span className='media__content text-truncate'>{data.content}</span>
      </div>
    </li>
  );
};

export default memo(BlogListComponent);
