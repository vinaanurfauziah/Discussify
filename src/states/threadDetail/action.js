/**
 * @TODO: Define all the actions (creator) for the threadDetail state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentThreadDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function toggleVoteThreadDetailActionCreator(ownerId) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: {
      ownerId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddCommentThreadDetail({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentThreadDetailActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToogleVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.toggleVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToogleVoteThreadDetail,
  asyncAddCommentThreadDetail,
};
