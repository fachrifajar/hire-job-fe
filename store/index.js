import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./reducer/auth";
import user from "./reducer/user";

import { persistStore, persistReducer } from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";

// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

//COMBINE ALL REDUCERS
const reducers = combineReducers({
  auth,
  user,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
