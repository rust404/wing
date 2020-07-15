import React, {
  FC,
  CSSProperties,
  useState,
  createContext,
  FunctionComponentElement,
} from "react";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./subMenu";
import classNames from "classnames";
import useToggle from "../../hooks/useToggle";

type MenuMode = "horizontal" | "vertical";
type SelectHandler = (obj: {
  itemKey: string;
  index: string;
  e: React.MouseEvent<Element>;
}) => void;

export interface IMenuProps {
  mode?: MenuMode;
  style?: CSSProperties;
  className?: string;
  onSelect?: (obj: { itemKey: string; e: React.MouseEvent<Element> }) => void;
}

interface IMenuContext {
  selectedIndex: string;
  handleSelect: SelectHandler;
  mode: MenuMode;
  updateState: boolean;
}
export const MenuContext = createContext<IMenuContext>({
  selectedIndex: "",
  handleSelect: () => {},
  mode: "horizontal",
  // toggle 从而使子组件知道有选项被点击了
  updateState: true,
});

const Menu: FC<IMenuProps> = (props) => {
  const { mode, onSelect, style, className, children, ...restProps } = props;
  const [selectedIndex, setSelectedIndex] = useState("");
  const [updateState, toggleUpdateState] = useToggle();

  const handleSelect: SelectHandler = ({ itemKey, index, e }) => {
    setSelectedIndex(index);
    toggleUpdateState();
    onSelect &&
      onSelect({
        itemKey,
        e,
      });
  };
  const classes = classNames("wing-menu", className, {
    "wing-menu-horizontal": mode === "horizontal",
    "wing-menu-vertical": mode === "vertical",
  });
  return (
    <ul className={classes} style={style} {...restProps}>
      <MenuContext.Provider
        value={{
          mode: mode || "horizontal",
          selectedIndex,
          handleSelect,
          updateState,
        }}
      >
        {React.Children.map(children, (child, index) => {
          const childElement = child as FunctionComponentElement<
            MenuItemProps | SubMenuProps
          >;
          const { displayName } = childElement.type;
          if (displayName === "MenuItem" || displayName === "SubMenu") {
            return React.cloneElement(childElement, {
              index: index + "",
            });
          } else {
            console.error(
              "Warning: Menu has a child which is not a MenuItem or SubMenu"
            );
          }
        })}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.displayName = "Menu";
Menu.defaultProps = {
  mode: "horizontal",
};

export default Menu;
