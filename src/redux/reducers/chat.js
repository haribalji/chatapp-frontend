import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: 
// if the value exisits in the local storage it will be fetched if not 
// null will be retuned
  getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) ||
   [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
        // here we increment the count of the notification
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
        // here reset the value
      state.notificationCount = 0;
    },

    setNewMessagesAlert: (state, action) => {
      const chatId = action.payload.chatId;
// here we are trying to find the corresponding index of that chatid 
// from the chatid collection

      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );

      // if index found increase the count of new meessages to this chat

      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        // if not found then add this new chatid and count  which is received by new chat or client in 
        // collection
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },

    removeNewMessagesAlert: (state, action) => {
      // which id is matching that we need to leave, remaining we need to add in the array
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotification,
  resetNotificationCount,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;