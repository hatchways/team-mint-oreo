import React, { createContext, useReducer } from "react";

import { initialState, conversationReducer } from "./conversation.reducer";

const store = createContext(initialState);
const { Provider } = store;

const ConversationStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(conversationReducer, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, ConversationStateProvider };
