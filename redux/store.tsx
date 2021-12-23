import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import albumReducer from './reducers/album';

export const store = configureStore({
  reducer: {
    user: userReducer,
    album: albumReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;