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
  const totalPages = Math.ceil(total / limit);

  const renderPag = () => {
    const page = currentPage;
    const html = [];
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 2) {
      html.push(<li className={`page-item ${page === 1 ? 'active' : ''}`} key='1'><button type='button' disabled={page === 1} onClick={() => onChangePage(1)} className='page-link'>1</button></li>);
      if (page > 3) {
        html.push(<li className='page-item' key='before-more'><button type='button' disabled className='page-link'>...</button></li>);
      }
    }

    // how many pages or li show before the current li
    if (page === totalPages) {
      beforePage -= 2;
    } else if (page === totalPages - 1) {
      beforePage -= 1;
    }
    // how many pages or li show after the current li
    if (page === 1) {
      afterPage += 2;
    } else if (page === 2) {
      afterPage += 1;
    }

    for (let plength = beforePage; plength <= afterPage; plength += 1) {
      // if plength is greater than totalPage length then continue
      if (plength > totalPages) {
        continue;
      }
      if (plength === 0) { // if plength is 0 than add +1 in plength value
        plength += 1;
      }

      html.push(
        <li
          key={plength}
          className={`page-item ${page === plength ? 'active' : ''}`}
        >
          <button type='button' className='page-link' disabled={page === plength} onClick={() => onChangePage(plength)}>
            {plength}
          </button>
        </li>
      );
    }

    if (page < (totalPages - 1)) {
      if (page < totalPages - 2) {
        html.push(<li className='page-item' key='after-more'><button disabled className='page-link' type='button'>...</button></li>);
      }
      html.push(
        <li key={totalPages} className={`page-item ${page === totalPages ? 'active' : ''}`}>
          <button type='button' className='page-link' disabled={page === totalPages} onClick={() => onChangePage(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return html;
  };

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

  return <ul className='pagination mt-4 justify-content-center'>{renderPag().map((item) => item)}</ul>;
};

export default PaginationComponent;
