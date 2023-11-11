import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Messages from "../Messages";

const MessagesContainer = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return <Messages messages={messages} myName={myName} />;
};
export default MessagesContainer;
