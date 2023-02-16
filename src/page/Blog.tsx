import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import blogApi from 'src/api/blog/blogApi';

import BlogItemComponent from 'src/components/BlogItem';
import LoadingComponent from 'src/components/Loading';
import NotFoundDataComponent from 'src/components/NotfoundData';
import PaginationComponent from 'src/components/Pagination';
import TitleComponent from 'src/components/Title';

import { BlogListType } from 'src/models/blog.model';

const PAGE_LIMIT = 10;

const Blog = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [blog, setBlog] = useState<BlogListType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch blog lists, rerender if router change
  useEffect(() => {
    const fetchBlogPagination = async () => {
      setLoading(true);
      const resp = await blogApi.fetchBlogPagination({
        page: Number(searchParams.get('page')) || 1,
        limit: PAGE_LIMIT,
      });
      if (!resp.error) {
        setLoading(false);
        if (resp?.length) {
          setBlog(resp);
        } else {
          setBlog(null);
        }
      } else {
        setLoading(false);
        setBlog(null);
        console.log(resp.msg);
      }
    };

    fetchBlogPagination();
  }, [location]);

  return (
    <div className='container'>
      <div className='blog__list'>
        <TitleComponent title='Blog article' />

        <ul className='list-unstyled my-3 '>
          {blog && blog.length > 0 && (
            <>
              {blog.map((item) => (
                <BlogItemComponent key={item.id} data={item} />
              ))}
              <PaginationComponent currentPage={Number(searchParams.get('page')) || 1} limit={PAGE_LIMIT} />
            </>
          )}

          {!blog && !loading && <NotFoundDataComponent title='Not found blog' isBack />}
        </ul>

        {loading && <LoadingComponent />}
      </div>
    </div>
  );
};

export default Blog;
