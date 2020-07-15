import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  RenderResult,
  queries,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Menu, { IMenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

let defaultProps: IMenuProps;
let wrapper: RenderResult<typeof queries>;
let defaultMenu: HTMLElement;
let verticalMenu: HTMLElement;
describe("test Menu, Submenu and MenuItem component", () => {
  beforeEach(() => {
    defaultProps = {
      onSelect: jest.fn(),
    };
    let defaultComponent = (
      <div>
        <Menu
          data-testid="test-default-menu"
          className="test1 test2"
          {...defaultProps}
        >
          <MenuItem disabled data-testid="test-disabled-item">
            1
          </MenuItem>
          <MenuItem
            data-testid="test-normal-item"
            className="custom-item-class"
          >
            2
          </MenuItem>
          <MenuItem data-testid="test-active-item">3</MenuItem>
          <MenuItem data-testid="test-selected-item">4</MenuItem>
          <SubMenu title="submenu" data-testid="test-horizontal-submenu">
            <MenuItem>sub-1</MenuItem>
            <MenuItem>sub-2</MenuItem>
          </SubMenu>
          <li>123</li>
        </Menu>
        <Menu
          data-testid="test-vertical-menu"
          mode="vertical"
          {...defaultProps}
        >
          <MenuItem disabled>1</MenuItem>
          <MenuItem data-testid="test-key" itemKey="1">
            2
          </MenuItem>
          <SubMenu title="submenu" data-testid="test-vertical-submenu">
            <MenuItem>sub-1</MenuItem>
            <MenuItem>sub-2</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    );
    wrapper = render(defaultComponent);
    const cssText = `
      .wing-submenu .wing-submenu-content {
        display: none;
      }
      .wing-submenu.is-open .wing-submenu-content {
        display: block;
      }
    `;
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = cssText;
    wrapper.container.append(style);

    defaultMenu = wrapper.getByTestId("test-default-menu");
    verticalMenu = wrapper.getByTestId("test-vertical-menu");
  });
  it("should render Menu Item className properly", () => {
    expect(defaultMenu).toHaveClass(
      "wing-menu wing-menu-horizontal test1 test2"
    );
    expect(verticalMenu).toHaveClass("wing-menu wing-menu-vertical");
  });
  it("should render Menu children properly", () => {
    expect(defaultMenu.querySelectorAll(":scope > li").length).toEqual(5);
  });
  it("should render MenuItem properly", () => {
    const disabledItem = wrapper.getByTestId("test-disabled-item");
    const normalItem = wrapper.getByTestId("test-normal-item");
    const activeItem = wrapper.getByTestId("test-active-item");
    const selectedItem = wrapper.getByTestId("test-selected-item");

    expect(disabledItem).toHaveClass("wing-menu-item is-disabled");
    expect(normalItem).toHaveClass("wing-menu-item custom-item-class");
    fireEvent.mouseOver(activeItem);
    expect(activeItem).toHaveClass("wing-menu-item is-active");
    fireEvent.click(selectedItem);
    expect(selectedItem).toHaveClass("wing-menu-item is-selected");
  });
  it("should display horizontal submenu properly", async () => {
    const submenu = wrapper.getByTestId("test-horizontal-submenu");
    const submenuContent = submenu.querySelector(".wing-submenu-content");
    expect(submenuContent).toBeNull();
    fireEvent.mouseEnter(submenu);
    const option = {
      timeout: 400,
    };
    await waitFor(() => {
      const submenuContent = submenu.querySelector(".wing-submenu-content");
      expect(submenuContent).toBeVisible();
    }, option);
    fireEvent.mouseLeave(submenu);
    await waitFor(() => {
      const submenuContent = submenu.querySelector(".wing-submenu-content");
      expect(submenuContent).toBeNull();
    }, option);
  });
  it("should display vertical submenu properly", async () => {
    const submenu = wrapper.getByTestId("test-vertical-submenu");
    const submenuTitle = submenu.querySelector(".wing-submenu-title");
    let submenuContent = submenu.querySelector(".wing-submenu-content");
    expect(submenuContent).toBeNull();
    fireEvent.click(submenuTitle as HTMLElement);
    await waitFor(() => {
      submenuContent = submenu.querySelector(".wing-submenu-content");
      expect(submenuContent).toBeVisible();
    });
    fireEvent.click(submenuTitle as HTMLElement);
    await waitFor(() => {
      submenuContent = submenu.querySelector(".wing-submenu-content");
      expect(submenuContent).toBeNull();
    });
  });
  it("should trigger onSelect properly when click menu-item", () => {
    const disabledItem = wrapper.getByTestId("test-disabled-item");
    const normalItem = wrapper.getByTestId("test-normal-item");
    fireEvent.click(disabledItem);
    expect(defaultProps.onSelect).not.toBeCalled();
    fireEvent.click(normalItem);
    expect(defaultProps.onSelect).toBeCalled();
  });
  it("should get key when select menu-item", () => {
    const keyItem = wrapper.getByTestId("test-key");
    fireEvent.click(keyItem);
    expect(
      (defaultProps.onSelect as jest.Mock).mock.calls[0][0].itemKey
    ).toEqual("1");
  });
});

export {};
