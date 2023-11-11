import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { ChatActions } from "./store";

export const createMySocketMiddleware = ({
  getMessage,
  getUsers,
}: ChatActions): Middleware => {
  return ({ getState, dispatch }) => {
    const url = "http://localhost:8888";
    let socket = io(url);
    socket.on("GET_USERS", (names) => {
      dispatch(getUsers(names));
    });
    socket.on("GET_MESSAGE", async (message) => {
      dispatch(getMessage(message));
    });

    return (next) => (action) => {
      if (action.type) {
        if (action.type === "chat/joinChat") {
          socket.emit("JOIN_CHAT", { name: action.payload });
        }
        if (action.type === "chat/sendMessage") {
          socket.emit("SEND_MESSAGE", action.payload);
        }
      }
      next(action);
    };
  };
};
