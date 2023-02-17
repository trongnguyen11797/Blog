/* eslint-disable no-alert */
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import { PAGE_LIMIT, URL_API } from 'src/common/constant';

import {
  ArgumentSagaBlog, BlogListType, ParamsType, ResponseCreate
} from 'src/models/blog.model';

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
function* createBlogSaga(action: PayloadAction<ArgumentSagaBlog>) {
  yield put(createBlogReducer());
  const { payload } = action;
  const { data, page, onResetForm } = payload;

  const params = {
    title: data.title.value,
    image: data.image.value,
    content: data.content.value,
  };

  try {
    const resp: ResponseCreate = yield axios.post(URL_API.blog, params);

    yield put(createBlogSuccessReducer({ page: page || 1, newData: resp.data as BlogListType }));
    alert('Create success');
    onResetForm();
  } catch (error) {
    alert('Create failed');
    yield put(createBlogFailedReducer());
  }
}

// Get blog list
function* getBlogSaga() {
  try {
    const resp: ResponseCreate = yield axios.get(URL_API.blog);

    yield put(getTotalDataSuccessReducer(resp.data as BlogListType[]));
  } catch (error) {
    yield put(getTotalDataFailedReducer());
  }
}

// Get blog pagination
function* getBlogPagSaga(action: PayloadAction<ParamsType>) {
  const { payload } = action;

  yield put(getBlogPagReducer());
  try {
    const resp: ResponseCreate = yield axios.get(URL_API.blog, { params: { ...payload, limit: PAGE_LIMIT } });

    yield put(getBlogPagSuccessReducer(resp.data as BlogListType[]));
  } catch (error) {
    yield put(getBlogPagFailedReducer());
  }
}

// Edit blog
function* editBlogPagSaga(action: PayloadAction<ArgumentSagaBlog>) {
  yield put(editBlogReducer());

  const { payload } = action;
  const { data, onResetForm } = payload;
  const params = {
    title: data.title.value,
    image: data.image.value,
    content: data.content.value,
  };
  try {
    const resp: ResponseCreate = yield axios.put(`${URL_API.blog}/${data.id}`, params);

    alert('Edit success');
    yield put(editBlogSuccessReducer(resp.data as BlogListType));
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
