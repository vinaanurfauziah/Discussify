import api from '../../utils/api';
/**
 * @TODO: Mendefinisikan semua tindakan (creator) untuk state threads
 */

// Definisikan ActionType
const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

// Fungsi untuk membuat aksi receiveThreads
function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

// Fungsi untuk membuat aksi addThread
function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

// Fungsi untuk membuat aksi toggleVoteThread
// function toggleVoteThreadActionCreator({ threadId, ownerId }) {
//   return {
//     type: ActionType.TOGGLE_VOTE_THREAD,
//     payload: {
//       threadId,
//       ownerId,
//     },
//   };
// }

const toggleVoteThreadActionCreator = ({ threadId, ownerId }) => ({ //+
  type: ActionType.TOGGLE_VOTE_THREAD,
  payload: { threadId, ownerId },
});

// Fungsi async untuk menambahkan thread baru
function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

// Fungsi async untuk mengubah status vote pada thread
// function asyncToogleVoteThread(threadId) {
//   return async (dispatch, getState) => {
//     const { authUser } = getState();
//     dispatch(toggleVoteThreadActionCreator({ threadId, ownerId: authUser.id }));

//     try {
//       await api.toggleVoteThread(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(toggleVoteThreadActionCreator({ threadId, ownerId: authUser.id }));
//     }
//   };
// }

async function asyncToogleVoteThread(threadId) { //+
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleVoteThreadActionCreator({ threadId, ownerId: authUser.id }));

    try {
      await api.toggleVoteThread(threadId);
    } catch (error) {
      alert(`Failed to toggle vote on thread ${threadId}: ${error.message}`);
      dispatch(toggleVoteThreadActionCreator({ threadId, ownerId: authUser.id }));
    }
  };
}

// Ekspor semua fungsi dan ActionType yang didefinisikan
export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  asyncAddThread,
  asyncToogleVoteThread,
};
