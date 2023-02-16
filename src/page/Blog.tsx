import { useEffect, useState } from 'react';

import BlogListComponent from 'src/components/BlogList';
import LoadingComponent from 'src/components/Loading';
import PaginationComponent from 'src/components/Pagination';

import { BlogListType } from 'src/models/blog.model';

import blogApi from '../api/blog/blogApi';

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
      <h1 className='py-3 text-center'>blog article</h1>
      <ul className='list-unstyled my-3 blog__list'>
        {blog && blog.length && (
          <>
            {blog.map((item) => (
              <BlogListComponent key={item.id} data={item} />
            ))}

            <PaginationComponent currentPage={page} data={blog} setPage={setPage} />
          </>
        )}
      </ul>

      {!loading && <LoadingComponent />}
    </div>
  );
};

export default Blog;
