/**
 * test scenario for authUser Reducer
 *
 * - should return the initial state when given by unknown action
 * - should return the authUser when given by SET_AUTH_USER action
 * - should return the authUser when given by UNSET_AUTH_USER action

 *
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { fakeAuthUser } from './action.test';

describe('AuthUser Reducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: fakeAuthUser,
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
  it('should return the authUser when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = fakeAuthUser;
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null,
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
