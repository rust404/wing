import React, {
  FC,
  InputHTMLAttributes,
  ReactElement,
  ChangeEventHandler,
} from "react";
import classNames from "classnames";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  disabled?: boolean;
  size?: "lg" | "sm";
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = (props) => {
  const {
    value,
    size,
    disabled,
    append,
    prepend,
    onChange,
    className,
    style,
    ...restProps
  } = props;
  const wrapperClasses = classNames("wing-input-wrapper", className, {
    [`wing-input-${size}`]: size,
  });
  const inputClasses = classNames("wing-input", {
    "is-disabled": disabled,
    "is-appended": append,
    "is-prepended": prepend,
  });
  // render
  const renderPrepend = prepend && (
    <span className="wing-input-group-addon wing-input-prepend">{prepend}</span>
  );
  const renderAppend = append && (
    <span className="wing-input-group-addon wing-input-append">{append}</span>
  );
  return (
    <div className={wrapperClasses} style={style} {...restProps}>
      {renderPrepend}
      <input
        type="text"
        value={value}
        className={inputClasses}
        onChange={onChange}
        disabled={disabled}
      />
      {renderAppend}
    </div>
  );
};

export default Input;
