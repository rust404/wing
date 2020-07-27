import React, { ReactNode, FC } from "react";
import { TransitionGroup } from "react-transition-group";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CollapseTransition } from "../CollapseTransition/collapseTransition";

export type MessageDataType = "success" | "warning" | "error" | "info";

export interface MessageData {
  id: number;
  type: MessageDataType;
  content: ReactNode;
  duration?: number;
}
interface MessageProps {
  messages: MessageData[];
}

export const Message: FC<MessageProps> = (props) => {
  const { messages } = props;
  const iconMap: {
    [index: string]: IconProp;
  } = {
    success: "check-circle",
    warning: "exclamation-circle",
    error: "times-circle",
    info: "info-circle",
  };
  const iconThemeMap = {
    success: "success",
    warning: "warning",
    error: "danger",
    info: "info",
  };
  return (
    <TransitionGroup className="wing-message-wrapper">
      {messages.map((msg) => {
        return (
          <CollapseTransition key={msg.id}>
            <div className="wing-message-item-wrapper">
              <div className="wing-message-item">
                <Icon
                  className="icon"
                  theme={iconThemeMap[msg.type]}
                  icon={iconMap[msg.type]}
                />
                {msg.content}
              </div>
            </div>
          </CollapseTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default Message;
