// // reducers.js
// import { ADD_LIKED_FACT, REMOVE_LIKED_FACT } from './actions';

// const initialState = {
//   likedFacts: [],
// };

// const reducer = (state = initialState, action) => {
//     console.log('Reducer action:', action);
//   switch (action.type) {
//     case ADD_LIKED_FACT:
//       console.log('Adding liked fact from reducers:', action.payload);
//       // Log current state before modification
//       console.log('Current state before adding:', state);
//       // Add the new liked fact
//       const newStateAfterAddition = {
//         ...state,
//         likedFacts: [...state.likedFacts, action.payload],
//       };
//       // Log modified state
//       console.log('New state after adding:', newStateAfterAddition);
//       return newStateAfterAddition;
//     case REMOVE_LIKED_FACT:
//       console.log('Removing liked fact from reducers:', action.payload);
//       // Log current state before modification
//       console.log('Current state before removing:', state);
//       // Remove the liked fact
//       const newStateAfterRemoval = {
//         ...state,
//         likedFacts: state.likedFacts.filter(fact => fact.id !== action.payload),
//       };
//       // Log modified state
//       console.log('New state after removing:', newStateAfterRemoval);
//       return newStateAfterRemoval;
//     default:
//       return state;
//   }
// };

// export default reducer;


import { ADD_LIKED_FACT, REMOVE_LIKED_FACT, LOAD_LIKED_FACT, TOGGLE_LIKED_FACT } from './actions';

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
    case LOAD_LIKED_FACT:
      return {
        ...state,
        likedFacts: action.payload
      };
      // case TOGGLE_LIKED_FACT:
      //   return {
      //     ...state,
      //     likedFacts: state.likedFacts.map(fact => {
      //       if (fact.id === action.payload) {
      //         return { ...fact, liked: !fact.liked };
      //       }
      //       return fact;
      //     }),
      //   };
    default:
      return state;
  }
};

export default reducer;


