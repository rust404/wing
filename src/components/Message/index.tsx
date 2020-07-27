import React, { FC, useState, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Message, MessageData, MessageDataType } from "./message";

const container = document.createElement("div");
if (!document.body.contains(container)) {
  document.body.appendChild(container);
}

interface MessageAdd {
  (content: ReactNode, duration?: number): void;
}

export const message: {
  [index: string]: MessageAdd;
} = {};

const MessageWrapper: FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  useEffect(() => {
    const messageType: MessageDataType[] = [
      "success",
      "error",
      "warning",
      "info",
    ];
    messageType.forEach((type) => {
      message[type] = (content, duration = 3000) => {
        const newMessage: MessageData = {
          id: +new Date(),
          type,
          content,
          duration,
        };
        setMessages((prevMessages) => {
          return prevMessages.concat(newMessage)
        });
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg !== newMessage)
          );
        }, duration);
      };
    });
  }, []);
  return (
    <Message messages={messages} />
  );
};

ReactDOM.render(<MessageWrapper />, container);
