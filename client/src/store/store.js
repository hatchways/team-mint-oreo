// example and usage
import React, {createContext, useReducer} from 'react'

const initialState = {}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'action description':
				return {
					...state, 
					payload: action.payload
					// some other stuff here
				}
			default:
				return state
		};
	}, initialState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export {store, StateProvider}

/*
usage: 

// index.js
import { StateProvider } from './store/store.js';

....
<StateProvider>
	<App />
</StateProvider>


// exampleComponent.component.jsx
import React, { useContext } from 'react';
import { store } from './store.js';

const ExampleComponent = () => {
  const globalState = useContext(store);
	console.log(globalState);

	const {dispatch} = globalState;
  dispatch({ 
		type: 'action description', 
		payload: 'payload' 
	})
};

*/