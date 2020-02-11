import UserActionTypes from './user.types';

/*
user: {
  id: number/string, 
  name: string, 
  avatar: {
    url: string, 
    fallback: string, 
  }
}
*/
export const initialState = {
  name: 'The Ultimate Legend',
  id: 123123124,
  avatar: {
    url: '',
    fallback: 'L',
  },
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
