// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user.slice';
import navigationReducer from '../reducers/navigation.slice';
import globalReducer from '../reducers/global.slice';

import App from 'next/app';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  global: globalReducer,
});

// Create the store with user and tasks slices
const store = configureStore({
  reducer: rootReducer,
});

export type TAppDispatch = typeof store.dispatch;
export type TAppState = ReturnType<typeof rootReducer>;

// hook to expose types
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;

export default store;
