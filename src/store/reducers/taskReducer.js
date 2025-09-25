// src/store/reducers/tasksReducer.js
import {
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../actions/taskActions';

const initialState = {
  byId: {},
  allIds: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        byId: { ...state.byId, [task.id]: task },
        allIds: [...state.allIds, task.id],
      };
    }
    case UPDATE_TASK_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        byId: { ...state.byId, [task.id]: task },
      };
    }
    case DELETE_TASK_SUCCESS: {
      const id = action.payload;
      const { [id]: removed, ...byId } = state.byId;
      return {
        ...state,
        byId,
        allIds: state.allIds.filter(taskId => taskId !== id),
      };
    }
    default:
      return state;
  }
}
