import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// declaring the types for our state
export type UserInfo = {
  name: string | null;
  email: string | null;
  password: string | null;
};
export type UserState = {
  user: UserInfo;
  loading: boolean;
};

const initialState: UserState = {
  user: {
    name: null,
    email: null,
    password: null
  },
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear: state => {
      return { 
        user: {
          name: null,
          email: null,
          password: null
        },
        loading: false
      };
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      return { 
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password
        }
      };
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  clear, 
  setUserInfo
} = userSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getUserInfo = (state: RootState) => state.user;

export default userSlice.reducer;