// actions.js
export const ADD_LIKED_FACT = 'ADD_LIKED_FACT';
export const REMOVE_LIKED_FACT = 'REMOVE_LIKED_FACT';
export const LOAD_LIKED_FACT = 'LOAD_LIKED_FACT';

export const addLikedFact = (fact) => {
    console.log('Adding liked fact from actions:', fact);
    return {
      type: ADD_LIKED_FACT,
      payload: fact,
    };
  };


export const removeLikedFact = (factId) => ({
  type: REMOVE_LIKED_FACT,
  payload: factId,
});
