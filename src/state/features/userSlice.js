import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

export const signInUser = createAsyncThunk('user/signin', async () => {
  const { user } = await signInWithPopup(auth, provider);
  const newUser = {
    displayName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };
  return newUser;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
    },
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

// Select the state you want to keep track of
export const selectUser = state => state.user.user;

//Export the mailSlice as a reducer:
export default userSlice.reducer;
