// reducers.js
import { ADD_LIKED_FACT, REMOVE_LIKED_FACT } from './actions';

const initialState = {
  likedFacts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKED_FACT:
      return {
        ...state,
        likedFacts: [...state.likedFacts, action.payload],
      };
    case REMOVE_LIKED_FACT:
      return {
        ...state,
        likedFacts: state.likedFacts.filter(fact => fact.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
