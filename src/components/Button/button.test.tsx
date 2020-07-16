import React from "react";
import Button, { ButtonSize, ButtonType } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

let testid = 0;
describe("test Button component", () => {
  const types: ButtonType[] = ["danger", "default", "link", "primary"];
  const sizes: ButtonSize[] = ["lg", "sm"];
  it("should render correct by default", () => {
    render(<Button data-testid={testid}>nice</Button>);
    const element = screen.getByTestId("" + testid++) as HTMLButtonElement;
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default");
  });
  it("should render correct by custom classname", () => {
    render(
      <Button data-testid={testid} className="hello">
        nice
      </Button>
    );
    const element = screen.getByTestId("" + testid++);
    expect(element).toHaveClass("btn btn-default hello");
  });
  it("should render correct by custom button type", () => {
    types.forEach((type) => {
      render(
        <Button data-testid={testid} btnType={type}>
          {type}
        </Button>
      );
      const element = screen.getByTestId("" + testid++);
      expect(element).toHaveClass(`btn btn-${type}`);
    });
  });
  it("should render link with type link and href", () => {
    render(
      <Button data-testid={testid} btnType="link" href="https://www.baidu.com">
        link
      </Button>
    );
    const element = screen.getByTestId("" + testid++);
    expect(element.tagName).toEqual("A");
  });
  it("should render button with type link and no href", () => {
    render(
      <Button data-testid={testid} btnType="link">
        link without href
      </Button>
    );
    const element = screen.getByTestId("" + testid++);
    expect(element.tagName).toEqual("BUTTON");
  });
  it("should render correct by custom button size", () => {
    sizes.forEach((size) => {
      render(
        <Button data-testid={testid} size={size}>
          {size}
        </Button>
      );
      const element = screen.getByTestId("" + testid++);
      expect(element).toHaveClass(`btn btn-${size}`);
    });
  });
  it("should fireEvent after click not disabled", () => {
    const onClick = jest.fn();
    render(
      <Button data-testid={testid} onClick={onClick}>
        click
      </Button>
    );
    const element = screen.getByTestId("" + testid++);
    fireEvent.click(element);
    expect(onClick).toHaveBeenCalled();
  });
  it("should not fireEvent after click if disabled", () => {
    const onClick = jest.fn();
    render(
      <Button data-testid={testid} onClick={onClick} disabled>
        not click
      </Button>
    );
    const element = screen.getByTestId("" + testid++);
    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
  });
});

export {};
