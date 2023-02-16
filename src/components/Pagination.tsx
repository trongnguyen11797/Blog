import { useNavigate, useSearchParams } from 'react-router-dom';
import { onGetParams } from 'src/common/function';

import { useAppSelector } from 'src/store/hooks';

type Props = {
  currentPage: number;
  limit: number;
};

const PaginationComponent = (props: Props) => {
  const { currentPage, limit } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const total = useAppSelector((state) => state.blog.total);

  const onChangePage = (i: number) => {
    navigate({
      pathname: '/',
      search: onGetParams({
        page: i.toString(),
        search: searchParams.get('search') || undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        order: searchParams.get('order') || undefined,
      })
    });
  };

  const renderPagination = () => {
    const html = [];
    for (let i = 1; i <= Math.ceil(total / limit); i += 1) {
      html.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <button type='button' className='page-link' onClick={() => onChangePage(i)} disabled={currentPage === i}>
            {i}
          </button>
        </li>
      );
    }

    return html;
  };

  return <ul className='pagination mt-4 justify-content-center'>{renderPagination().map((item) => item)}</ul>;
};

export default PaginationComponent;
