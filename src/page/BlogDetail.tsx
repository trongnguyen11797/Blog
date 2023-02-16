import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import blogApi from 'src/api/blog/blogApi';

import LoadingComponent from 'src/components/Loading';
import NotFoundDataComponent from 'src/components/NotfoundData';
import TitleComponent from 'src/components/Title';

import { BlogListType } from 'src/models/blog.model';

const BlogDetail = () => {
  const { blogId } = useParams();

  const [blogDetail, setBlogDetail] = useState<BlogListType | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog detail
  useEffect(() => {
    const fetchBlogDetail = async () => {
      setLoading(true);

      const resp = await blogApi.fetchBlogDetail(blogId as string);
      if (!resp.error) {
        setLoading(false);
        setBlogDetail(resp);
      } else {
        setLoading(false);
        console.log(resp.msg);
      }
    };

    fetchBlogDetail();
  }, []);
  if (loading) return <LoadingComponent />;
  return (
    <main className='content blog__detail'>
      <div className='container'>
        {loading ? (
          <LoadingComponent />
        ) : blogDetail && !loading && Object.keys(blogDetail).length ? (
          <>
            <TitleComponent title='Blog detail' isBack />

            <div className='card'>
              <img src={blogDetail.image} className='card-img-top' alt='... ' />
              <div className='card-body'>
                <h5 className='card-title'>{blogDetail.title}</h5>
                <p className='card-text'>{blogDetail.content}</p>
              </div>
            </div>
          </>
        ) : (
          <NotFoundDataComponent />
        )}
      </div>
      {loading && <LoadingComponent />}
    </main>
  );
};

export default BlogDetail;
