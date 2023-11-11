import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { ChatActions, RootState } from "./store";
import { addFileToStorage } from "../features/addFileToStorage";
const uniqid = require("uniqid");

const messageConstructor = (data: any, getState: () => RootState) => {
  const id = uniqid();
  return {
    message: data.inputValue,
    user: getState().chat.myName,
    reply: getState().chat.reply ?? null,
    file: data.fileData ? { ...data.fileData, id: id } : null,
    id: id,
  };
};

export const createMySocketMiddleware = ({
  getMessage,
  getUsers,
  joinChat,
  replyMessage,
  sendMessage,
  updateMessages,
}: ChatActions): Middleware => {
  return ({ getState, dispatch }) => {
    const url = "http://localhost:8888";
    let socket = io(url);
    socket.on("GET_USERS", (names) => {
      dispatch(getUsers(names));
    });
    socket.on("GET_MESSAGE", async (message) => {
      if (message.file) {
        const file = { ...message.file };
        await addFileToStorage(file);
        delete message.file.src;
      }
      dispatch(getMessage(message));
    });

    return (next) => (action) => {
      if (action.type) {
        if (action.type === "chat/joinChat") {
          socket.emit("JOIN_CHAT", { name: action.payload });
        }
        if (action.type === "chat/sendMessage") {
          const message = messageConstructor(action.payload, getState);
          socket.emit("SEND_MESSAGE", message);
        }
      }
      next(action);
    };
  };
};
