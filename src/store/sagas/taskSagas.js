// src/store/sagas/taskSagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import {
  CREATE_TASK_REQUEST, createTaskSuccess, createTaskFailure,
  UPDATE_TASK_REQUEST, updateTaskSuccess, updateTaskFailure,
  DELETE_TASK_REQUEST, deleteTaskSuccess, deleteTaskFailure,
} from '../actions/taskActions';

function* createTaskSaga(action) {
  try {
    const { data } = yield call(mockApi.createTask, action.payload);
    yield put(createTaskSuccess(data));
  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

function* updateTaskSaga(action) {
  try {
    const { id, updates } = action.payload;
    const { data } = yield call(mockApi.updateTask, id, updates);
    yield put(updateTaskSuccess(data));
  } catch (error) {
    yield put(updateTaskFailure(error.message));
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(mockApi.deleteTask, action.payload);
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

export default function* taskSagas() {
  yield takeEvery(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
}
