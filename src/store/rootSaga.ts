import { all } from 'redux-saga/effects';
import { watchBlogSaga } from './saga/blog';

export default function* rootSaga() {
  yield all([watchBlogSaga()]);
}
