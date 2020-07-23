import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./input";

describe("test Input component", () => {
  it("should render different size properly", () => {
    const wrapper = render(
      <div>
        <Input data-testid="lg-input" size="lg" />
        <Input data-testid="sm-input" size="sm" />
        <Input data-testid="default-input" />
      </div>
    );
    const lgInput = wrapper.getByTestId("lg-input");
    const smInput = wrapper.getByTestId("sm-input");
    const defaultInput = wrapper.getByTestId("default-input");
    expect(lgInput).toHaveClass("wing-input-wrapper wing-input-lg");
    expect(smInput).toHaveClass("wing-input-wrapper wing-input-sm");
    expect(defaultInput).toHaveClass("wing-input-wrapper");
  });
  it("should be have disabled attribute if disabled", () => {
    const wrapper = render(<Input disabled data-testid="disabled-input" />);
    const disabledInput = wrapper
      .getByTestId("disabled-input")
      .querySelector("input");
    expect(disabledInput).toHaveAttribute("disabled");
  });
  it("should display prepend and append properly", () => {
    const wrapper = render(
      <Input append="append" prepend="prepend" data-testid="addon-input" />
    );
    const appendElement = wrapper.getByText("append");
    const prependElement = wrapper.getByText("prepend");
    expect(appendElement).toHaveClass(
      "wing-input-group-addon wing-input-append"
    );
    expect(prependElement).toHaveClass(
      "wing-input-group-addon wing-input-prepend"
    );
  });
  it("should trigger onChange properly", () => {
    const onChange = jest.fn()
    const wrapper = render(
      <Input data-testid="onchange-input" onChange={onChange}/>
    );
    const input = wrapper.getByTestId('onchange-input').querySelector('input')
    fireEvent.change(input as HTMLInputElement, {target: { value: 'hello'}})
    expect(onChange).toHaveBeenCalled()
  });
});
