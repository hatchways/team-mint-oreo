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
export const tempChatData = [
  // {
  //   id: 1,
  //   name: 'The First',
  //   secondary: 'lala land',
  //   notifications: 9,
  //   avatar: {
  //     url: null,
  //     fallback: 'F',
  //   },
  // },
  // {
  //   id: 2,
  //   name: 'Second Group',
  //   secondary: 'you memers',
  //   notifications: 2,
  //   avatar: {
  //     url: null,
  //     fallback: 'SG',
  //   },
  // },
  // {
  //   id: 123,
  //   name: 'Perfect Kittens',
  //   secondary: 'purrrrrr',
  //   notifications: 690,
  //   avatar: {
  //     url: null,
  //     fallback: 'PK',
  //   },
  // },
  // {
  //   id: 234,
  //   name: 'uncreative name',
  //   secondary: '101010101',
  //   notifications: 6,
  //   avatar: {
  //     url: null,
  //     fallback: 'UN',
  //   },
  // },
  // {
  //   id: 222,
  //   name: 'Creative Circle',
  //   secondary: 'CCCCCCC',
  //   notifications: 90,
  //   avatar: {
  //     url: null,
  //     fallback: 'CC',
  //   },
  // },
  // {
  //   id: 68,
  //   name: 'Old timers',
  //   secondary: 'old old old',
  //   notifications: 0,
  //   avatar: {
  //     url: null,
  //     fallback: 'OT',
  //   },
  // },
];

/*
  Contacts/Friends:{
    user: user <<< see user.reducer
    isOnline: boolean, 
  }
  */
export const tempContactsList = [
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
];

/*
  Invites: {
    user: user << see user.reducer
    isRecipiant: boolean, 
  }
  */
export const tempInvitesList = [
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
];
