/**
 * skenario test
 *
 * - setAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - UnsetAuthUser Thunk
 *  - should dispatch action correctly when data fetching success
 */
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

export const fakeAuthUser = {
  id: 'test-1',
  name: 'Test pertama',
  email: 'test-1@gmail.com',
  avatar: 'image.png',
};

const fakeLogin = {
  email: 'test-1@gmail.com',
  password: 'test123',
};

const fakeToken = 'accesstoken-test';
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('AuthUser thunk', () => {
  beforeEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeLogin);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    api.putAccessToken = () => Promise.resolve(fakeToken);

    const dispatch = vi.fn();
    // action
    await asyncSetAuthUser({ email: 'test-1@gmail.com', password: 'test123' })(
      dispatch
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.resolve();
    api.putAccessToken = () => Promise.resolve();

    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncSetAuthUser({ email: 'test-1@gmail.com', password: 'test123' })(
      dispatch
    );

    //assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('Unset AuthUser thunk', () => {
  beforeEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    api.putAccessToken = () => Promise.resolve('');
    const dispatch = vi.fn();

    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });
});
