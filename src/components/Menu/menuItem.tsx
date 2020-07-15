import React, { FC, CSSProperties, useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "onClick"> {
  index?: string;
  itemKey?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<Element>) => void;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { selectedIndex, handleSelect, mode } = useContext(MenuContext);
  const {
    index,
    disabled,
    style,
    className,
    onClick,
    children,
    itemKey,
    ...restProps
  } = props;
  const [isHover, setIsHover] = useState(false);
  const onEnter = () => {
    setIsHover(true);
  };
  const onLeave = () => {
    setIsHover(false);
  };
  const classes = classNames("wing-menu-item", className, {
    "is-disabled": disabled,
    "is-selected": disabled !== true && selectedIndex === index,
    "is-active": isHover ? true : false,
  });
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (disabled) return;
    if (index !== undefined) {
      console.log("menu-item:", props);
      handleSelect({
        itemKey: itemKey || "",
        index,
        e,
      });
      onClick && onClick(e);
    }
  };
  const hiererchy = index === undefined ? 1 : index.split("-").length;
  const spanStyle =
    mode === "vertical" ? { paddingLeft: hiererchy * 20 + "px" } : {};

  return (
    <li
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={classes}
      style={style}
      onClick={handleClick}
      {...restProps}
    >
      <span style={{ ...spanStyle }}>
        {children}
        ---
        {index}
      </span>
    </li>
  );
};

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = {
  disabled: false,
};

export default MenuItem;
