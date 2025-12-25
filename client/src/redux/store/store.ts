import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slice/User.slice';

const root_reducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
  },
  root_reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof root_reducers>;
export type AppDispatch = typeof store.dispatch;
