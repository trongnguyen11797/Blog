import { useEffect, useState } from 'react';

import blogApi from 'src/api/blog/blogApi';

import BlogItemComponent from 'src/components/BlogItem';
import LoadingComponent from 'src/components/Loading';
import PaginationComponent from 'src/components/Pagination';
import TitleComponent from 'src/components/Title';

import { BlogListType } from 'src/models/blog.model';

const PAGE_LIMIT = 10;

const Blog = () => {
  const [blog, setBlog] = useState<BlogListType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // Fetch blog lists
  useEffect(() => {
    const fetchBlogLists = async () => {
      setLoading(true);
      const resp = await blogApi.fetchBlogLists({
        page,
        limit: PAGE_LIMIT,
      });
      if (!resp.error) {
        setLoading(false);
        setBlog(resp);
      } else {
        setLoading(false);
        console.log(resp.msg);
      }
    };

    fetchBlogLists();
  }, [page]);

  return (
    <div className='container'>
      <div className='blog__list'>
        <TitleComponent title='Blog article' />

        <ul className='list-unstyled my-3 '>
          {blog && blog.length && (
            <>
              {blog.map((item) => (
                <BlogItemComponent key={item.id} data={item} />
              ))}

              <PaginationComponent currentPage={page} data={blog} setPage={setPage} />
            </>
          )}
        </ul>

        {loading && <LoadingComponent />}
      </div>
    </div>
  );
};

export default Blog;
