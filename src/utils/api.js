/* eslint-disable no-use-before-define */
const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  // Fungsi untuk melakukan fetch dengan otorisasi token
  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Fungsi untuk menyimpan token akses ke local storage
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  // Fungsi untuk mendapatkan token akses dari local storage
  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // Fungsi untuk mendaftarkan pengguna baru
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  // Fungsi untuk melakukan login
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  // Fungsi untuk mendapatkan profil pengguna sendiri
  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  // Fungsi untuk mendapatkan semua pengguna
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  // Fungsi untuk mendapatkan semua percakapan (threads)
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  // Fungsi untuk mendapatkan detail percakapan berdasarkan ID
  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    // Ambil informasi pemilik thread
    const { owner } = detailThread;
    const { id, name, avatar } = owner;
    const ownerInfo = { id, name, avatar };

    // Ambil informasi komentar-komentar yang ada di thread tersebut
    const { comments } = detailThread;

    // Tambahkan informasi pemilik thread dan komentar-komentar ke dalam objek detailThread
    const detailThreadWithOwnerAndComments = {
      ...detailThread,
      owner: ownerInfo,
      comments: comments.map((comment) => ({
        ...comment,
        owner: {
          id: comment.owner.id,
          name: comment.owner.name,
          avatar: comment.owner.avatar,
        },
      })),
    };

    return detailThreadWithOwnerAndComments;
  }

  // Fungsi untuk membuat percakapan baru
  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;

    return thread;
  }

  // Fungsi untuk menambahkan atau menghapus vote pada percakapan
  // async function toggleVoteThread(id) {
  //   const response = await _fetchWithAuth(`${BASE_URL}/threads/votes`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       threadId: id,
  //     }),
  //   });

  //   const responseJson = await response.json();

  //   const { status, message } = responseJson;

  //   if (status !== 'success') {
  //     throw new Error(message);
  //   }
  // }

  async function toggleVoteThread(id) {
    try {
      await voteThread({ threadId: id, voteType: 1 });
    } catch (error) {
      throw new Error(`Failed to toggle vote on thread ${id}: ${error.message}`);
    }
  }

  // Fungsi untuk membuat komentar pada percakapan
  async function createComment({ threadId, content }) { //+
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.comment;
  }

  // Fungsi untuk melakukan vote pada thread
  // async function voteThread({ threadId, voteType }) {
  //   const response = await _fetchWithAuth(
  //     `${BASE_URL}/threads/${threadId}/${
  //       voteType === 1 ? 'up-vote' : 'down-vote'
  //     }`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         threadId,
  //       }),
  //     },
  //   );

  //   const responseJson = await response.json();

  //   const { status, message } = responseJson;

  //   if (status !== 'success') {
  //     throw new Error(message);
  //   }
  // }

  async function voteThread({ threadId, voteType }) { //+
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/${voteType === 1 ? 'up-vote' : 'down-vote'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
        }),
      },
    );

    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
  }

  // Fungsi untuk melakukan vote pada komentar
  async function voteComment({ threadId, commentId, voteType }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${
        voteType === 1 ? 'up-vote' : 'down-vote'
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
        }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  // Fungsi untuk mendapatkan leaderboard
  async function getLeaderboard() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    return responseJson.data.leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    toggleVoteThread,
    getThreadDetail,
    createComment,
    voteThread,
    voteComment,
    getLeaderboard,
  };
})();

export default api;
