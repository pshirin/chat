import localforage from "localforage";

export const createFilesStorage = async (messages: any) => {
  await localforage.setItem("files", messages);
};
