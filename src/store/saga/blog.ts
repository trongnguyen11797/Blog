/* eslint-disable no-unused-vars */
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PAGE_LIMIT, URL_API } from 'src/common/constant';

import {
  CREATE_BLOG,

  GET_TOTAL,
  GET_BLOG_PAG,
  EDIT_BLOG,
} from '../action';

import {
  createBlogFailedReducer,
  createBlogReducer,
  createBlogSuccessReducer,

  getBlogPagFailedReducer,
  getBlogPagReducer,
  getBlogPagSuccessReducer,

  getTotalDataSuccessReducer,
  getTotalDataFailedReducer,
  editBlogReducer,
  editBlogFailedReducer,
  editBlogSuccessReducer,
} from '../reducer/blog';

// Create blog
function* createBlogSaga(action: any): any {
  yield put(createBlogReducer());
  const { payload } = action;
  const { data, page, onResetForm } = payload;

  const params = {
    title: data.title.value,
    image: data.image.value,
    content: data.content.value,
  };

  try {
    const resp: any = yield axios.post(URL_API.blog, params);

    yield put(createBlogSuccessReducer({ page, newData: resp.data }));
    alert('Create success');
    onResetForm();
  } catch (error) {
    alert('Create failed');
    yield put(createBlogFailedReducer());
  }
}

// Get blog list
function* getBlogSaga(): any {
  try {
    const resp = yield axios.get(URL_API.blog);

    yield put(getTotalDataSuccessReducer(resp.data));
  } catch (error) {
    yield put(getTotalDataFailedReducer());
  }
}

// Get blog pagination
function* getBlogPagSaga(action: any): any {
  const { payload } = action;

  yield put(getBlogPagReducer());
  try {
    const resp = yield axios.get(URL_API.blog, { params: { ...payload, limit: PAGE_LIMIT } });

    yield put(getBlogPagSuccessReducer(resp.data));
  } catch (error) {
    yield put(getBlogPagFailedReducer());
  }
}

// Edit blog
function* editBlogPagSaga(action: any): any {
  yield put(editBlogReducer());
  const { payload } = action;
  const { data, onResetForm } = payload;
  const params = {
    title: data.title.value,
    image: data.image.value,
    content: data.content.value,
  };
  try {
    const resp = yield axios.put(`${URL_API.blog}/${data.id}`, params);

    alert('Edit success');
    yield put(editBlogSuccessReducer(resp.data));
    onResetForm();
  } catch (error) {
    alert('Edit failed');
    yield put(editBlogFailedReducer());
  }
}

export function* watchBlogSaga() {
  yield takeEvery(GET_TOTAL, getBlogSaga);
  yield takeEvery(GET_BLOG_PAG, getBlogPagSaga);
  yield takeEvery(CREATE_BLOG, createBlogSaga);
  yield takeEvery(EDIT_BLOG, editBlogPagSaga);
}
