import localforage from "localforage";
import { Message } from "../types";

export const createFilesStorage = async (messages: Message[]) => {
  await localforage.setItem("files", messages);
};
