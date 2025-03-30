import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";
import { documentDirectory, EncodingType } from "expo-file-system";

// Define Expo File System Storage
const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}reduxPersist/`,
  encoding: EncodingType.UTF8,
  debug: true,
});

// Define Persist Configuration
const persistConfig = {
  key: "root",
  storage: expoFileSystemStorage,
};

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  user : userReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create Persistor
export const persistor = persistStore(store);

// Define Root State and Dispatch Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
