/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * @TODO: Create Redux store
 */
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer, hideLoading, showLoading } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
  },
});

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // preload process
      const authUser = await getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // end preload process
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export default store;
