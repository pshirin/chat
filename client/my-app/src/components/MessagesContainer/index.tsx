import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Messages from "../Messages";
import { mergeMessagesWithIDB } from "../../features/mergeMessagesWithIDB";

const MessagesContainer = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);
  const [messagesWithFiles, setMessagesWithFiles]: Awaited<Promise<any>> =
    useState(null);

  useEffect(() => {
    const getMessages = mergeMessagesWithIDB(messages);
    getMessages.then((mergedMessages) => {
      setMessagesWithFiles(mergedMessages);
    });
  }, [messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesWithFiles]);

  return <Messages messagesWithFiles={messagesWithFiles} myName={myName} />;
};
export default MessagesContainer;
