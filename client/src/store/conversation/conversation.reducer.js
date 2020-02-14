import ConversationActionTypes from './conversation.types';

const meowStringMaker = count => {
  let text = '';
  for (let i = 0; i < count; i++) {
    text += 'meow ';
  }
  return text + '?';
};

const makeMeows = () => {
  const list = [];
  for (let i = 0; i < 20; i++) {
    list.push({
      id: 2000 + i,
      texts: {
        en: meowStringMaker(i + 1),
      },
      original: 'en',
      timeStamp: `14:${i < 10 ? '0' + i : i}`,
      senderId: 2 + 'i',
      isSender: Math.random() > 0.8,
    });
  }
  return list;
};

export const initialState = {
  /*
		conversationId: [
			message: {
				texts:{
					en:
					fe: 
					zh:
				}
				original: of of the keys in text like [en, fe, zh], 
				timestamp: timeobject or string, 
        senderId: string/id
        isSender: boolean
			}
		]
	*/
  1: [
    {
      id: 1234,
      texts: {
        en: 'The First Message Ever Rendered',
      },
      original: 'en',
      timeStamp: '1:50',
      senderId: 1,
      isSender: true,
    },
    {
      id: 1235,
      texts: {
        en: 'The Second Message Ever Rendered',
      },
      original: 'en',
      timeStamp: '2:10',
      senderId: 1234,
      isSender: false,
    },
  ],
  2: [
    {
      id: 690,
      texts: {
        en: 'Second Chat is better than the first ',
      },
      original: 'en',
      timeStamp: '10:50',
      senderId: 12,
      isSender: false,
    },
    {
      id: 699,
      texts: {
        en: 'definately',
      },
      original: 'en',
      timeStamp: '10:51',
      senderId: 1,
      isSender: false,
    },
  ],
  123: [
    ...[
      {
        id: 1000,
        texts: {
          en: 'meow?',
        },
        original: 'en',
        timeStamp: '14:00',
        senderId: 1,
        isSender: true,
      },
    ],
    ...makeMeows(),
  ],
};

export const conversationReducer = (state, action) => {
  switch (action.type) {
    // case ConversationActionTypes.ACTION_TYPE:
    default:
      return state;
  }
};
