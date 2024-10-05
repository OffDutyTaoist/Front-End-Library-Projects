const ADD ='ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message,
  };
};

const messageReducer = (previousState = [], action) => {
  switch (action.type) {
    case ADD:
      return [...previousState, action.message];
      break;
    default:
      return previousState;
  }
};

const store = Redux.createStore(messageReducer);

//Alt Code ==>

// Action type
const ADD = 'ADD';

// Action creator
const addMessage = (message) => {
  return {
    type: ADD,
    message,
  };
};

// Reducer
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      // Return a new array that includes the current state and the new message
      return [...state, action.message];
    default:
      return state;
  }
};

// Create Redux store
const store = Redux.createStore(messageReducer);

// Dispatch an action to test
store.dispatch(addMessage('Hello World'));

// Log the state to verify
console.log(store.getState());  // Should output ['Hello World']
