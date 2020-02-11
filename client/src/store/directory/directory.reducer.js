import DirectoryActionTypes from './directory.types';

export const initialState = {
  /*
  Comms: {
    id: integer/string, 
    name: string, 
    secondary: string, 
    notifications: integer, // number of notifications
    avatar: {
      url: string, 
      fallback: string // basically what to render if url is blank
    }
  }
  */
  commsList: [
    {
      id: 1,
      name: 'The First',
      secondary: 'lala land',
      notifications: 9,
      avatar: {
        url: null,
        fallback: 'F',
      },
    },
    {
      id: 2,
      name: 'Second Group',
      secondary: 'you memers',
      notifications: 2,
      avatar: {
        url: null,
        fallback: 'SG',
      },
    },
    {
      id: 123,
      name: 'Perfect Kittens',
      secondary: 'purrrrrr',
      notifications: 690,
      avatar: {
        url: null,
        fallback: 'PK',
      },
    },
  ],
  /*
  Contacts/Friends:{
    user: user <<< see user.reducer
    isOnline: boolean, 
  }
  */
  contactsList: [
    {
      user: {
        id: 1,
        name: 'Bob Ross',
        avatar: {
          url: null,
          fallback: 'BR',
        },
      },
      isOnline: true,
    },
    {
      user: {
        id: 15,
        name: 'Rober Onwards',
        avatar: {
          url: null,
          fallback: 'RO',
        },
      },
      isOnline: false,
    },
    {
      user: {
        id: 69,
        name: 'THE LEGEND',
        avatar: {
          url: null,
          fallback: 'TL',
        },
      },
      isOnline: false,
    },
  ],
  /*
  Invites: {
    user: user << see user.reducer
    isRecipiant: boolean, 
  }
  */
  invitesList: [
    {
      user: {
        id: 15,
        name: 'Rober Onwards',
        avatar: {
          url: null,
          fallback: 'RO',
        },
        isRecipiant: true,
      },
    },
    {
      user: {
        id: 1,
        name: 'Bob Ross',
        avatar: {
          url: null,
          fallback: 'BR',
        },
      },
      isRecipiant: false,
    },
  ],
};
export const directoryReducer = (state, action) => {
  switch (action.type) {
    // TODO: case DirectoryActionTypes.SOMETYPE:
    case DirectoryActionTypes.DO_SOME_ACTION:
    // just do default for now
    default: {
      return state;
    }
  }
};
