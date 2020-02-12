import ConversationActionTypes from './conversation.types';

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
      timeStamp: 1234678,
      senderId: 1,
    },
    {
      id: 1234,
      texts: {
        en: 'The First Message Ever Rendered',
      },
      original: 'en',
      timeStamp: 1234679,
      senderId: 1234,
    },
    {},
  ],
};

export const conversationReducer = (state, action) => {
  switch (action.type) {
    // case ConversationActionTypes.ACTION_TYPE:
    default:
      return state;
  }
};
