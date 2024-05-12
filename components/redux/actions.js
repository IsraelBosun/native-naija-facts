// actions.js
export const ADD_LIKED_FACT = 'ADD_LIKED_FACT';
export const REMOVE_LIKED_FACT = 'REMOVE_LIKED_FACT';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const addLikedFact = (fact) => {
    // console.log('Adding liked fact from actions:', fact);
    return {
      type: ADD_LIKED_FACT,
      payload: fact,
    };
  };


export const removeLikedFact = (factId) => ({
  type: REMOVE_LIKED_FACT,
  payload: factId,
});

export const loadLikedFacts = (facts) => ({
  type: 'LOAD_LIKED_FACTS', // Add a new action type for loading
  payload: facts,
});


// // actions.js

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const ADD_LIKED_FACT = 'ADD_LIKED_FACT';
// export const REMOVE_LIKED_FACT = 'REMOVE_LIKED_FACT';
// export const LOAD_LIKED_FACT = 'LOAD_LIKED_FACT';
// export const TOGGLE_LIKED_FACT = 'TOGGLE_LIKED_FACT';

// export const addLikedFact = (fact) => {
//     return async (dispatch) => {
//         try {
//             // Save the liked fact to AsyncStorage
//             const storedFacts = await AsyncStorage.getItem('likedFacts');
//             let likedFacts = JSON.parse(storedFacts) || [];
//             likedFacts.push(fact);
//             await AsyncStorage.setItem('likedFacts', JSON.stringify(likedFacts));

//             // Dispatch action to update Redux state
//             dispatch({
//                 type: ADD_LIKED_FACT,
//                 payload: fact,
//             });
//         } catch (error) {
//             console.error('Error adding liked fact:', error);
//         }
//     };
// };

// export const removeLikedFact = (factId) => {
//     return async (dispatch) => {
//         try {
//             // Remove the fact from AsyncStorage
//             const storedFacts = await AsyncStorage.getItem('likedFacts');
//             let likedFacts = JSON.parse(storedFacts) || [];
//             likedFacts = likedFacts.filter(fact => fact.id !== factId);
//             await AsyncStorage.setItem('likedFacts', JSON.stringify(likedFacts));

//             // Dispatch action to update Redux state
//             dispatch({
//                 type: REMOVE_LIKED_FACT,
//                 payload: factId,
//             });
//         } catch (error) {
//             console.error('Error removing liked fact:', error);
//         }
//     };
// };

// export const loadLikedFacts = () => {
//     return async (dispatch) => {
//         try {
//             // Load liked facts from AsyncStorage
//             const storedFacts = await AsyncStorage.getItem('likedFacts');
//             const likedFacts = JSON.parse(storedFacts) || [];

//             // Dispatch action to update Redux state
//             dispatch({
//                 type: LOAD_LIKED_FACT,
//                 payload: likedFacts,
//             });
//         } catch (error) {
//             console.error('Error loading liked facts:', error);
//         }
//     };
// };

// export const toggleLikedFact = (factId) => ({
//     type: TOGGLE_LIKED_FACT,
//     payload: factId,
// });

