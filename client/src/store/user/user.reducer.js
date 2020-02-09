import UserActionTypes from './user.types';

export const initialState = {
  // TODO: states go here
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
