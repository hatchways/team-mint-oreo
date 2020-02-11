import DirectoryActionTypes from './directory.types';

export const initialState = {
  /*
  Comms: {
    id: integer/string, 
    name: string, 
    secondary: string, 
    numUnread: integer,
    avatar: {
      url: string, 
      alt: string // basically what to render if url is blank
    }
  }
  */
  commsList: [
    {
      id: 1,
      name: 'The First',
      secondary: 'lala land',
      numUnread: 9,
      avatar: {
        url: null,
        alt: 'F',
      },
    },
    {
      id: 2,
      name: 'Second Group',
      secondary: 'you memers',
      numUnread: 2,
      avatar: {
        url: null,
        alt: 'SG',
      },
    },
    {
      id: 123,
      title: 'Perfect Kittens',
      secondary: 'purrrrrr',
      numUnread: 690,
      avatar: {
        url: null,
        alt: 'PK',
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
          alt: 'BR',
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
          alt: 'RO',
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
          alt: 'TL',
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
          alt: 'RO',
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
          alt: 'BR',
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
