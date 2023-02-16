/* eslint-disable no-unused-vars */
import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { URL_API } from 'src/common/constant';

import {
  CREATE_BLOG,

  GET_TOTAL,
  GET_BLOG_PAG,
} from '../action';

import {
  createBlogFailedReducer,
  createBlogReducer,
  createBlogSuccessReducer,

  getBlogPagFailedReducer,
  getBlogPagReducer,
  getBlogPagSuccessReducer,

  getTotalDataSuccessReducer,
  getTotalDataFailedReducer
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
    const resp: any = yield axios.post(URL_API.blog, { body: params });

    yield put(createBlogSuccessReducer({ page, newData: resp.data }));
    onResetForm();
  } catch (error) {
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
  const { page, limit } = payload;

  yield put(getBlogPagReducer());
  try {
    const resp = yield axios.get(`${URL_API.blog}?page=${page}&limit=${limit}`);

    yield put(getBlogPagSuccessReducer(resp.data));
  } catch (error) {
    yield put(getBlogPagFailedReducer());
  }
}

export function* watchBlogSaga() {
  yield takeEvery(CREATE_BLOG, createBlogSaga);
  yield takeEvery(GET_TOTAL, getBlogSaga);
  yield takeEvery(GET_BLOG_PAG, getBlogPagSaga);
}
