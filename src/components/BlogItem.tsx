import { memo } from 'react';
import { Link } from 'react-router-dom';

import { BlogListType } from 'src/models/blog.model';

type Props = {
  data: BlogListType;
  // eslint-disable-next-line no-unused-vars
  onEditBlog?: (blog: BlogListType) => void;
};

const BlogItemComponent = (props: Props) => {
  const { data, onEditBlog } = props;

  return (
    <li className='media align-items-center'>
      <Link to={data.id}>
        <img src={data.image} className='mr-3' width={64} height={64} alt='...' loading='lazy' />
      </Link>
      <div className='media__inner'>
        <div className='media-body'>
          <Link to={data.id}>
            <h5 className='mt-0 mb-1 media__title'>{data.title}</h5>
          </Link>
          <span className='media__content'>{data.content}</span>
        </div>
        <button type='button' className='btn btn-secondary' onClick={onEditBlog ? () => onEditBlog(data) : undefined}>Edit</button>
      </div>
    </li>
  );
};

export default memo(BlogItemComponent);
