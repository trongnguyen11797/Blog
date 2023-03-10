import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { GET_BLOG_PAG, GET_TOTAL } from 'src/store/action';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { PAGE_LIMIT } from 'src/common/constant';

import BlogItemComponent from 'src/components/BlogItem';
import LoadingComponent from 'src/components/Loading';
import NotFoundDataComponent from 'src/components/NotfoundData';
import PaginationComponent from 'src/components/Pagination';
import TitleComponent from 'src/components/Title';

import { BlogListType, ModalListsType } from 'src/models/blog.model';

import FilterComponent from './Filter';

import ModalBlog from './Modal';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    blogPagination, loadingBlogPag
  } = useAppSelector((state) => state.blog);
  const [modalList, setModalList] = useState<ModalListsType>({
    isShow: false,
    data: null,
    type: 'create',
  });

  const onEditBlog = (blog: BlogListType) => {
    setModalList(() => ({
      isShow: true,
      data: blog,
      type: 'edit',
    }));
  };

  // Fetch blog with pagination, re-render if router change
  // Fetch total data
  useEffect(() => {
    const paramsQuery = {
      page: searchParams.get('page') || 1,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      order: searchParams.get('order') || undefined,
    };

    dispatch({ type: GET_BLOG_PAG, payload: paramsQuery });
    dispatch({ type: GET_TOTAL });
  }, [location]);

  return (
    <div className='container'>
      <div className='blog__list'>
        <TitleComponent title='Blog article' />

        <button
          type='button'
          className='btn btn-primary'
          onClick={() => setModalList(({
            data: null,
            type: 'create',
            isShow: true,
          }))}
        >
          + Add new blog
        </button>

        <FilterComponent />

        <ul className='list-unstyled my-3 '>
          {blogPagination && blogPagination.length > 0 && (
            <>
              {blogPagination.map((item) => (
                <BlogItemComponent key={item.id} data={item} onEditBlog={onEditBlog} />
              ))}
              <PaginationComponent currentPage={Number(searchParams.get('page')) || 1} limit={PAGE_LIMIT} />
            </>
          )}

          {!blogPagination && !loadingBlogPag && <NotFoundDataComponent title='Not found blog' isBack />}
          {blogPagination && blogPagination.length === 0 && !loadingBlogPag && <NotFoundDataComponent title='Not found blog' />}
        </ul>

        {loadingBlogPag && <LoadingComponent />}
        <ModalBlog modalLists={modalList} setModalList={setModalList} />
      </div>
    </div>
  );
};

export default Blog;
