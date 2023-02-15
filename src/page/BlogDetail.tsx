import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import blogApi from 'src/api/blog/blogApi';
import NotFoundDataComponent from 'src/components/NotfoundData';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log({ loading, blogDetail });

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

  return (
    <main className='content'>
      <div className='container'>
        <h5>Blog detail</h5>
        <NotFoundDataComponent />
      </div>
    </main>
  );
};

export default BlogDetail;
