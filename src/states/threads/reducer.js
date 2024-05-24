/**
 * @TODO: Define the reducer for the threads state
 */
import { ActionType } from './action';

// function threadsReducer(threads = [], action = {}) {
//   switch (action.type) {
//     case ActionType.RECEIVE_THREADS:
//       return action.payload.threads;
//     case ActionType.ADD_THREAD:
//       return [action.payload.thread, ...threads];
//     case ActionType.TOGGLE_VOTE_THREAD:
//       return threads.map((thread) => {
//         if (thread.id === action.payload.threadId) {
//           return {
//             ...thread,
//             votes: thread.votes.includes(action.payload.ownerId)
//               ? thread.votes.filter((id) => id !== action.payload.ownerId)
//               : thread.votes.concat([action.payload.ownerId]),
//           };
//         }
//         return thread;
//       });
//     default:
//       return threads;
//   }
// }

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
      // eslint-disable-next-line max-len
        ? { ...thread, votes: thread.votes.includes(action.payload.ownerId) ? thread.votes.filter((id) => id !== action.payload.ownerId) : [...thread.votes, action.payload.ownerId] }
        : thread));
    default:
      return threads;
  }
}

export default threadsReducer;
