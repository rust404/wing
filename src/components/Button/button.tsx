import React, {
  FC,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
  children?: ReactNode;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    size,
    btnType,
    disabled,
    href,
    children,
    ...restProps
  } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  const preventDefault = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };
  if (btnType === "link") {
    return (
      <a
        href={href || "#"}
        {...restProps}
        className={classes}
        onClick={disabled === true ? preventDefault : restProps.onClick}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  btnType: "default",
  disabled: false,
};

export default Button;
