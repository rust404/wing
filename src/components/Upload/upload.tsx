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
  onProgress?: (e: ProgressEvent, file: File) => void;
  onChange?: () => void;
  onSuccess?: (file: UploadFile) => void;
  onError?: (err: Error) => void;
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
  const [fileList, setFileList] = useState<UploadFile[]>([
    { 
      uid: '123',
      status: "success",
      name: 'test.txt',
      progress: 100,
    },
    { 
      uid: '23',
      status: "uploading",
      name: 'upload.txt',
      progress: 50,
    },
    { 
      uid: '10',
      status: "error",
      name: 'error.txt',
      progress: 50,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleBtnClick = () => {
    inputRef.current?.click();
  };
  const uploadFiles = (files: FileList) => {
    const formData = new FormData();
    const fileArr = Array.from(files);
    fileArr.forEach((file) => {
      formData.append(name || file.name, file);
      const uploadFile: UploadFile = {
        uid: Date.now() + "uploadfile",
        status: "uploading",
        name: file.name,
        progress: 0,
      };
      setFileList((prevList) => prevList.concat(uploadFile));
      axios({
        method: "post",
        url: action,
        headers: {
          ...headers,
        },
        onUploadProgress(e) {
          setFileList((prevList) => {
            uploadFile.progress = (e.loaded / e.total) * 100;
            return [...prevList];
          });
          onProgress && onProgress(e, file);
        },
        data: formData,
      })
        .then((resp) => {
          setFileList((prevList) => {
            uploadFile.status = "success";
            return [...prevList];
          });
          onSuccess && onSuccess(uploadFile);
        })
        .catch((err) => {
          setFileList((prevList) => {
            uploadFile.status = "error";
            return [...prevList];
          });
          onError && onError(err);
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
