import { chatSlice } from "./store";

export const { sendMessage, updateMessages, joinChat, replyMessage, getUsers } =
  chatSlice.actions;
