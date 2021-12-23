import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

// declaring the types for our state
export type Message = {
  type: "success" | "info" | "warning" | "error" | undefined;
  text: string | '';
}
export type AlbumInfo = {
  type: string | null;
  curAlbumId: string | null;
  // album: Array<object>;
  message: Message | null;
  
};

const initialState: AlbumInfo = {
  type: 'InTake',
  curAlbumId: null,
  // album: [],
  message: null
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clear: state => {
      return initialState;
    },
    // setAlbum: (state, action: PayloadAction<Array<object>>) => {
    //   return { 
    //     ...state,
    //     album: action.payload.album        
    //   };
    // },
    setAlbumType: (state, action: PayloadAction<string>) => {
      return { 
        ...state,
        type: action.payload        
      };
    },
    setCurrentId: (state, action: PayloadAction<string>) => {
      return { 
        ...state,
        curAlbumId: action.payload        
      };
    },
    setMessage: (state, action: PayloadAction<Message>) => {
      return { 
        ...state,
        message: action.payload
      };
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  clear, 
  // setAlbum,
  setAlbumType,
  setCurrentId,
  setMessage,
} = albumSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getAlbumInfo = (state: RootState) => state.album;

export default albumSlice.reducer;