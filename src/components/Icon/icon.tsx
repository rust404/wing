import React, { FC } from "react";
import classNames from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

library.add(fas);

export interface IconProps extends FontAwesomeIconProps {
  theme?: string;
}

const Icon: FC<IconProps> = (props) => {
  const { icon, className, theme, style = {}, ...restProps } = props;
  const classes = classNames("wing-icon", className, {
    [`icon-${theme}`]: theme,
  });
  const defaultStyle = {
    width: "16px",
  };
  return (
    <FontAwesomeIcon
      className={classes}
      icon={icon}
      style={{ ...defaultStyle, ...style }}
      {...restProps}
    />
  );
};

export default Icon;
