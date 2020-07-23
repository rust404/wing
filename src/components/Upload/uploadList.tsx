import React, { FC } from "react";
import { UploadFile } from "./upload";
import ProgressBar from "../ProgressBar/progressBar";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface UploadListProps {
  fileList: UploadFile[];
  handleRemove: (fileToRemove: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, handleRemove } = props;
  const iconTheme = {
    success: "success",
    error: "danger",
    uploading: "info",
  };
  const iconMap: {
    [index: string]: IconProp;
  } = {
    success: "check-circle",
    error: "times-circle",
    uploading: "spinner",
  };
  return (
    <ul className="wing-upload-file-list">
      <TransitionGroup>
        {fileList.map((file) => (
          <CSSTransition key={file.uid} classNames="zoom-in-top" timeout={300}>
            <li className="wing-upload-file-list-item">
              <div className="file-info">
                {`${file.name}--${file.progress}`}
                <Icon
                  className="info-icon"
                  theme={iconTheme[file.status]}
                  spin={file.status === "uploading"}
                  icon={iconMap[file.status]}
                />
                {file.status !== "uploading" && (
                  <Icon
                    onClick={() => handleRemove(file)}
                    className="delete-icon"
                    theme="danger"
                    icon="trash"
                  />
                )}
              </div>
              {file.status === "uploading" && (
                <ProgressBar height="2px" percent={file.progress} />
              )}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
