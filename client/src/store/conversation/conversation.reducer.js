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
};

export const conversationReducer = (state, action) => {
  switch (action.type) {
    // case ConversationActionTypes.ACTION_TYPE:
    default:
      return state;
  }
};
