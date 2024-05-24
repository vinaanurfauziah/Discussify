/**
 * @TODO: Define reducer for the threadDetail state
 */
import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREADDETAIL:
      return null;
    case ActionType.ADD_COMMENT_THREAD_DETAIL:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };
    case ActionType.TOGGLE_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.ownerId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.ownerId)
          : threadDetail.upVotesBy.concat(action.payload.ownerId),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
