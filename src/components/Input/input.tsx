import React, {
  FC,
  InputHTMLAttributes,
  ReactElement,
  ChangeEventHandler,
} from "react";
import classNames from "classnames";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "lg" | "sm";
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = (props) => {
  // extract props
  const { value, size, append, prepend, onChange, ...restProps } = props;
  // select class
  const wrapperClasses = classNames("wing-input-wrapper", {
    [`wing-input-${size}`]: size,
  });
  const inputClasses = classNames("wing-input", {
    'is-appended': append,
    'is-prepended': prepend
  })
  // render
  const renderPrepend = prepend && (
    <span className="wing-input-group-addon wing-input-prepend">{prepend}</span>
  );
  const renderAppend = append && (
    <span className="wing-input-group-addon wing-input-append">{append}</span>
  );
  return (
    <div className={wrapperClasses}>
      {renderPrepend}
      <input
        type="text"
        className={inputClasses}
        onChange={onChange}
        {...restProps}
      />
      {renderAppend}
    </div>
  );
};

export default Input;
