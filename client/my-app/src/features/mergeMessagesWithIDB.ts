import localforage from "localforage";
import { File, Message } from "../types";

export async function mergeMessagesWithIDB(messages: Message[]) {
  const mergedMessages = await localforage
    .getItem("files")
    .then((filesIDB: any) => {
      if (filesIDB) {
        return messages.map((message: Message) => {
          const index = filesIDB.findIndex(
            (file: File) => file.id === message.id
          );
          if (index) {
            return { ...message, file: filesIDB[index] };
          }
        });
      }
      return messages;
    })
    .then((merged) => {
      return merged;
    });
  return mergedMessages;
}
