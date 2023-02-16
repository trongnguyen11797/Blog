import { createSearchParams } from 'react-router-dom';
import { ParamsType } from 'src/models/blog.model';

// Get params query url
export const onGetParams = ({
  page, sortBy, order, search
}: ParamsType) => {
  const params: ParamsType = {};

  if (page) {
    params.page = page.toString();
  }
  if (search) {
    params.search = search;
  }
  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (order) {
    params.order = order;
  }

  return createSearchParams(params).toString();
};

// Search Debounce
// eslint-disable-next-line no-unused-vars
export const searchDebounce = (func: (e: any) => void, timeout = 500) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
