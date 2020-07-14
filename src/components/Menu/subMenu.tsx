import React, {
  FC,
  FunctionComponentElement,
  useState,
  useContext,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import { MenuContext } from "./menu";

export interface SubMenuProps {
  title: string;
  className?: string;
  index?: string;
}
const SubMenu: FC<SubMenuProps> = (props) => {
  const {
    title,
    className,
    children,
    index: parentIndex,
    ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  const { selectedIndex, mode } = useContext(MenuContext);
  const classes = classNames("wing-menu-item wing-submenu", className, {
    "is-open": open,
  });
  const titleClasses = classNames("wing-submenu-title", {
    "is-active":
      parentIndex === undefined
        ? false
        : selectedIndex.indexOf(parentIndex) === 0,
  });
  const handleClickTitle = () => {
    setOpen((state) => !state);
  };
  const hiererchy =
    parentIndex === undefined ? 1 : parentIndex.split("-").length;
  return (
    <li className={classes} {...restProps}>
      <div
        className={titleClasses}
        style={
          mode === "vertical" ? { paddingLeft: hiererchy * 20 + "px" } : {}
        }
        onClick={handleClickTitle}
      >
        {title}
      </div>
      <ul className="wing-submenu-content">
        {React.Children.map(children, (child, index) => {
          const childElement = child as FunctionComponentElement<
            MenuItemProps | SubMenuProps
          >;
          const { displayName } = childElement.type;
          if (displayName === "MenuItem" || displayName === "SubMenu") {
            return React.cloneElement(childElement, {
              index: `${parentIndex}-${index}`,
            });
          } else {
            console.error(
              "Warning: Menu has a child which is not a MenuItem or SubMenu"
            );
          }
        })}
      </ul>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
