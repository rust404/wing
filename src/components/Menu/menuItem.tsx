import React, { FC, CSSProperties, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps
  extends Omit<React.HTMLProps<HTMLLIElement>, "onClick"> {
  index?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: (index: string) => void;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { selectedIndex, handleSelect, mode } = useContext(MenuContext);
  const { index, disabled, style, className, onClick, children } = props;
  const classes = classNames("wing-menu-item", className, {
    "is-disabled": disabled,
    "is-selected": disabled !== true && selectedIndex === index,
  });
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (disabled) return;
    if (index !== undefined) {
      handleSelect(index);
      onClick && onClick(index);
    }
  };
  const hiererchy = index === undefined ? 1 : index.split("-").length;
  const spanStyle =
    mode === "vertical" ? { paddingLeft: hiererchy * 20 + "px" } : {};

  return (
    <li className={classes} style={style} onClick={handleClick}>
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
