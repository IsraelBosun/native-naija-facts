import { View, Text } from 'react-native'
import React from 'react'
import { AsyncStorage } from '@react-native-async-storage/async-storage'

const LIKED_FACTS_KEY = 'likedFacts';

export const asyncStorageMiddleware = store => next => async action => {
  next(action);

  switch (action.type) {
    case ADD_LIKED_FACT:
    case REMOVE_LIKED_FACT:
      try {
        await AsyncStorage.setItem(LIKED_FACTS_KEY, JSON.stringify(store.getState().factsReducer.likedFacts));
      } catch (error) {
        // Error handling
      }
      break;
    case LOAD_LIKED_FACT:
      try {
        const storedFacts = await AsyncStorage.getItem(LIKED_FACTS_KEY);
        if (storedFacts) {
          store.dispatch({ type: LOAD_LIKED_FACT, payload: JSON.parse(storedFacts) });  
        }
      } catch (error) {
        // Error handling
      }
      break;
    default: 
      break;
  }
};