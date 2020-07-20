import React, {
  FC,
  FunctionComponentElement,
  useState,
  useContext,
  useRef,
  useEffect,
  Props,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import { MenuContext } from "./menu";
import useClickOutside from "../../hooks/useClickOutside";
import { CSSTransition } from "react-transition-group";
import Icon from "../Icon/icon";

export interface SubMenuProps extends Props<HTMLLIElement> {
  title: string;
  className?: string;
  /**
   * @ignore
   */
  index?: string;
}
export const SubMenu: FC<SubMenuProps> = (props) => {
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
    window.clearTimeout(timerRef.current.leave);
    mode === "horizontal" && setOpen(true);
  };
  const onLeave = () => {
    window.clearTimeout(timerRef.current.leave);
    timerRef.current.leave = window.setTimeout(() => {
      mode === "horizontal" && setOpen(false);
    }, 300);
  };
  useEffect(() => {
    if (mode === "vertical") return;
    setTimeout(() => {
      setOpen(false);
    }, 100);
  }, [updateState, mode]);
  useClickOutside(() => {
    mode === "vertical" && setOpen(false);
  }, domRef);

  const isActive = () => {
    if (mode === "vertical") {
      return parentIndex === undefined
        ? false
        : selectedIndex.indexOf(parentIndex) === 0;
    } else {
      return (
        open ||
        (parentIndex === undefined
          ? false
          : selectedIndex.indexOf(parentIndex) === 0)
      );
    }
  };
  const classes = classNames("wing-menu-item wing-submenu", className, {
    "is-open": open,
    "is-active": isActive(),
  });
  const titleClasses = classNames("wing-submenu-title", {
    "is-active": isActive(),
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
        <Icon icon="angle-down" className="wing-submenu-title-icon" />
      </div>
      <CSSTransition
        timeout={mode === "horizontal" ? 300 : 0}
        classNames={mode === "horizontal" ? "zoom-in-top" : ""}
        in={open}
        appear
        unmountOnExit
      >
        <ul className="wing-submenu-content">
          {React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<
              MenuItemProps | SubMenuProps
            >;
            const { displayName } = childElement.type;
            // 兼容MDX语法
            if (
              displayName === "MenuItem" ||
              displayName === "SubMenu" ||
              displayName === "MDXCreateElement"
            ) {
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
      </CSSTransition>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
