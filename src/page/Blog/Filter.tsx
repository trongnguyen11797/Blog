import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { onGetParams, searchDebounce } from 'src/common/function';

const FilterComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchRef = useRef<HTMLInputElement>(null);

  const onChangeFilter = ({ value, type }: {value: string; type: string}) => {
    // Get current query params
    const getParams = {
      page: '1',
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      order: searchParams.get('order') || undefined,
    };

    navigate({
      pathname: '/',
      search: onGetParams({
        ...getParams,
        [type]: value || undefined
      })
    });
  };

  // Reset filter
  const onResetFilter = () => {
    navigate('/');
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <form className='mt-3'>
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              ref={searchRef}
              defaultValue={searchParams.get('search') || ''}
              id='title'
              placeholder='Input title'
              onChange={searchDebounce((e) => onChangeFilter({ value: e.target.value, type: 'search' }))}
            />
          </div>
        </div>
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='sortBy'>Sort by</label>
            <select value={searchParams.get('sortBy') || ''} className='form-control' id='sortBy' onChange={(e) => onChangeFilter({ value: e.target.value, type: 'sortBy' })}>
              <option value='' hidden>Sort by</option>
              <option value='id'>Id</option>
              <option value='title'>Title</option>
              <option value='content'>Content</option>
            </select>
          </div>
        </div>

        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='orderBy'>Order by</label>
            <select value={searchParams.get('order') || ''} className='form-control' id='orderBy' onChange={(e) => onChangeFilter({ value: e.target.value, type: 'order' })}>
              <option value='' hidden>Sort by order</option>
              <option value='asc'>Asc</option>
              <option value='desc'>Desc</option>
            </select>
          </div>
        </div>
      </div>

      <button type='button' className='w-25 btn btn-danger' onClick={onResetFilter}>Reset</button>
    </form>
  );
};

export default FilterComponent;
