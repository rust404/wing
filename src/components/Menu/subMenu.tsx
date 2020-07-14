import React, {
  FC,
  FunctionComponentElement,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import { MenuContext } from "./menu";
import useClickOutside from "../../hooks/useClickOutside";

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
  const { selectedIndex, mode, updateState } = useContext(MenuContext);
  const domRef = useRef<HTMLLIElement>(null);
  const timerRef = useRef({
    enter: -1,
    leave: -1,
  });
  const onEnter = () => {
    window.clearTimeout(timerRef.current.enter);
    timerRef.current.enter = window.setTimeout(() => {
      mode === "horizontal" && setOpen(true);
    }, 300);
  };
  const onLeave = () => {
    window.clearTimeout(timerRef.current.leave);
    timerRef.current.enter = window.setTimeout(() => {
      mode === "horizontal" && setOpen(false);
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }, [updateState]);
  useClickOutside(() => {
    mode === "vertical" && setOpen(false);
  }, domRef);

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
    mode === "vertical" && setOpen((state) => !state);
  };
  const hiererchy =
    parentIndex === undefined ? 1 : parentIndex.split("-").length;
  return (
    <li
      className={classes}
      {...restProps}
      ref={domRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
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
