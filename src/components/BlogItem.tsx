import { memo } from 'react';
import { BlogListType } from 'src/models/blog.model';

type Props = {
  data: BlogListType;
};

const BlogItemComponent = (props: Props) => {
  const { data } = props;
  return (
    <li className='media'>
      <img src={data.image} className='mr-3' width={64} height={64} alt='...' loading='lazy' />
      <div className='media-body'>
        <h5 className='mt-0 mb-1'>{data.title}</h5>
        <span className='content text-truncate'>{data.content}</span>
      </div>
    </li>
  );
};

export default memo(BlogItemComponent);
