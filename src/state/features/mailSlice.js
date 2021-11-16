import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMail: null,
  sendMessageIsOpen: false,
};

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: state => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: state => {
      state.sendMessageIsOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectMail, openSendMessage, closeSendMessage } =
  mailSlice.actions;

// Select the state you want to keep track of
export const selectSendMessageIsOpen = state => state.mail.sendMessageIsOpen;

export const selectOpenMail = state => state.mail.selectedMail;
//Export the mailSlice as a reducer:
export default mailSlice.reducer;
