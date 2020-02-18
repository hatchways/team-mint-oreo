import DirectoryActionTypes from './directory.types';

export const initialState = {
  // currently active conversation to display
  currentlyActive: null,
  showBackdrop: false,
  showSidebar: false,
  language: 'english',
};
export const directoryReducer = (state, action) => {
  switch (action.type) {
    case DirectoryActionTypes.SET_CURRENTLY_ACTIVE:
      return { ...state, currentlyActive: action.payload };
    case DirectoryActionTypes.TOGGLE_BACKDROP:
      return { ...state, showBackdrop: !state.showBackdrop };
    case DirectoryActionTypes.CLOSE_BACKDROP:
      return { ...state, showBackdrop: false };
    case DirectoryActionTypes.TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case DirectoryActionTypes.CLOSE_SIDEBAR:
      return { ...state, showSidebar: false };
    case DirectoryActionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };
    default: {
      return state;
    }
  }
};
