import {
  configureStore,
  createSlice,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createMySocketMiddleware } from "./createMySocketMiddleware";
import { ChatState } from "../types";

const initialState: ChatState = {
  update: false,
  messages: [],
  reply: null,
  events: {
    isConnect: false,
  },
  users: [],
  myName: null,
  peerId: null,
  conn: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    joinChat(state, action) {
      state.myName = action.payload;
    },
    getUsers(state, action) {
      state.users = action.payload;
    },
    updateMessages(state, action) {
      state.messages = action.payload;
    },
    getMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    sendMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    replyMessage(state, action) {
      state.reply = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createMySocketMiddleware(chatSlice.actions)),
});
export type ChatActions = typeof chatSlice.actions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
