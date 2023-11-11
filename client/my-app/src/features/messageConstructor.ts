import { RootState } from "../redux/store";

const uniqid = require("uniqid");

export const messageConstructor = (data: any, state: RootState) => {
  const id = uniqid();
  return {
    message: data.inputValue,
    user: state.chat.myName,
    reply: state.chat.reply ?? null,
    file: data.fileData ? { ...data.fileData, id: id } : null,
    id: id,
  };
};
