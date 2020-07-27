import React, {
  FC,
  useRef,
  ChangeEventHandler,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import Button from "../Button/button";
import axios from "axios";
import { UploadList } from "./uploadList";

interface UploadProps {
  beforeUpload?: () => void;
  onProgress?: (e: ProgressEvent, file: UploadFile) => void;
  onChange?: () => void;
  onSuccess?: (file: UploadFile, data: any) => void;
  onError?: (file: UploadFile, err: Error) => void;
  onRemoved?: (file: UploadFile) => void;
  accept?: string;
  multiple?: boolean;
  action: string;
  headers?: { [index: string]: any };
  name?: string;
}

export interface UploadFile {
  uid: string;
  status: "success" | "uploading" | "error";
  name: string;
  progress: number;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onChange,
    onSuccess,
    onError,
    onRemoved,
    accept,
    multiple,
    headers,
    name,
    children,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleBtnClick = () => {
    inputRef.current?.click();
  };
  const transferUploadFile = (file: File): UploadFile => {
    return {
      uid: Date.now() + "uploadfile",
      status: "uploading",
      name: file.name,
      progress: 0,
    };
  };
  const uploadFiles = (files: FileList) => {
    const fileArr = Array.from(files);
    fileArr.forEach((file) => {
      const formData = new FormData();
      formData.append(name || file.name, file);
      const uploadFile = transferUploadFile(file);

      setFileList((prevList) => prevList.concat(uploadFile));
      axios
        .post(action, {
          headers: {
            ...headers,
          },
          onUploadProgress(e: ProgressEvent) {
            setFileList((prevList) => {
              uploadFile.progress = (e.loaded / e.total) * 100;
              return [...prevList];
            });
            onProgress && onProgress(e, uploadFile);
          },
          data: formData,
        })
        .then((resp) => {
          setFileList((prevList) => {
            uploadFile.status = "success";
            return [...prevList];
          });
          onSuccess && onSuccess(uploadFile, resp.data);
        })
        .catch((err) => {
          setFileList((prevList) => {
            uploadFile.status = "error";
            return [...prevList];
          });
          onError && onError(uploadFile, err);
        });
    });
  };
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    onChange && onChange();
    files && uploadFiles(files);
  };
  const handleRemove = (fileToRemove: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((file) => fileToRemove !== file);
    });
    onRemoved && onRemoved(fileToRemove);
  };
  return (
    <div className="wing-upload">
      {children ? (
        React.Children.map(children, (child, index) => {
          if (isValidElement(child) && index === 0) {
            return cloneElement(child, {
              onClick: handleBtnClick,
            });
          }
        })
      ) : (
        <Button btnType="primary" onClick={handleBtnClick}>
          upload
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      {<UploadList fileList={fileList} handleRemove={handleRemove} />}
    </div>
  );
};

export default Upload;
