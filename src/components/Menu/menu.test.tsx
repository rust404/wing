import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  RenderResult,
  queries,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import Menu, { IMenuProps } from "./menu";
import MenuItem from "./menuItem";

let defaultProps: IMenuProps = {
  onSelect: jest.fn(),
};
let defaultComponent = (
  <Menu data-testid="test-menu" className="test1 test2" {...defaultProps}>
    <MenuItem disabled>1</MenuItem>
    <MenuItem>2</MenuItem>
    <MenuItem>3</MenuItem>
    <MenuItem>4</MenuItem>
    <li>123</li>
  </Menu>
);
let wrapper: RenderResult<typeof queries>;
let element: HTMLElement;
describe("test Menu, Submenu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(defaultComponent);
    element = wrapper.getByTestId("test-menu");
  });
  it("should render Menu className properly by default", () => {
    expect(element).toHaveClass("wing-menu wing-menu-horizontal test1 test2");
  });
  it("should render Menu className properly by custom mode", () => {
    cleanup();
    wrapper = render(
      React.cloneElement(defaultComponent, {
        mode: "vertical",
      })
    );
    element = wrapper.getByTestId("test-menu");
    expect(element).toHaveClass("wing-menu wing-menu-vertical test1 test2");
  });
  it("should render disabled item properly", () => {
    const liArr = element.querySelectorAll(":scope > li");
    for (let i = 0; i < liArr.length; i++) {
      if (i === 0) {
        expect(liArr[i]).toHaveClass("wing-menu-item is-disabled");
      } else {
        expect(liArr[i]).not.toHaveClass("is-disabled");
        expect(liArr[i]).toHaveClass("wing-menu-item");
      }
    }
  });
  it("should render and fireEvent properly when click menu item", () => {
    const liArr = element.querySelectorAll(":scope > li");
    let times = 0;
    for (let i = 0; i < liArr.length; i++) {
      fireEvent.click(liArr[i]);
      for (let j = 0; j < liArr.length; j++) {
        if (j === i && j !== 0) {
          expect(liArr[j]).toHaveClass("is-active");
        } else {
          expect(liArr[j]).not.toHaveClass("is-active");
        }
      }
      expect(defaultProps.onSelect).toHaveBeenCalledTimes(
        i === 0 ? times : ++times
      );
    }
  });
});

export {};
