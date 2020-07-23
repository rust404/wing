import React from "react";
import { config } from "react-transition-group";
import { render, fireEvent } from "@testing-library/react";
import AutoComplete from "./autocomplete";
config.disabled = true;

describe("test AutoComplete component", () => {
  it("should hide options by default", () => {
    const wrapper = render(
      <AutoComplete data-testid="default" dataSrc={[{ value: "1" }]} />
    );
    const options = wrapper
      .getByTestId("default")
      .querySelector(".wing-auto-complete-options");
    expect(options).toBeNull();
  });
  it("should show all options when focus and nothing input", () => {
    const wrapper = render(
      <AutoComplete
        data-testid="focus"
        dataSrc={[{ value: "1" }, { value: "2" }]}
      />
    );
    const element = wrapper.getByTestId("focus");
    const input = element.querySelector("input");
    fireEvent.focus(input as HTMLInputElement);
    const options = element.querySelectorAll(".wing-autocomplete-options > li");
    expect(options.length).toBe(2);
  });
  it("should show proper options with filterOption", () => {
    const wrapper = render(
      <AutoComplete
        data-testid="search"
        dataSrc={[
          { value: "12" },
          { value: "123" },
          { value: "13" },
          { value: "23" },
          { value: "12" },
          { value: "13" },
          { value: "24" },
        ]}
        filterOption={
          ({value}, searchText) => {
            return value.includes(searchText)
          }
        }
      />
    );
    const element = wrapper.getByTestId("search");
    const input = element.querySelector("input") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "12" } });
    const options = element.querySelectorAll(".wing-autocomplete-options > li");
    expect(options.length).toBe(3);
  });
  it("should hide options and display option value when select one option selected", () => {
    const wrapper = render(
      <AutoComplete
        data-testid="select"
        dataSrc={[
          { value: "12" },
          { value: "123" },
          { value: "13" },
          { value: "23" },
          { value: "12" },
          { value: "13" },
          { value: "24" },
        ]}
      />
    );
    const element = wrapper.getByTestId("select");
    const input = element.querySelector("input") as HTMLInputElement;
    fireEvent.focus(input);
    const optionsWrapper = element.querySelector(".wing-autocomplete-options");
    expect(optionsWrapper).toBeInTheDocument()
    const options = element.querySelectorAll(".wing-autocomplete-options > li");
    fireEvent.click(options[2]);
    expect(input.value).toBe('13')
    expect(optionsWrapper).not.toBeInTheDocument()
  });
  it("should display options classname properly", () => {
    const wrapper = render(
      <AutoComplete
        data-testid="option-class"
        dataSrc={[
          { value: "12" },
          { value: "123" },
          { value: "13" },
          { value: "23" },
          { value: "24" },
        ]}
      />
    );
    const element = wrapper.getByTestId("option-class");
    const input = element.querySelector("input") as HTMLInputElement;
    fireEvent.focus(input);
    const options = element.querySelectorAll(".wing-autocomplete-options > li");
    const option0 = options[0]
    fireEvent.change(input, {target: {value: '12'}})
    expect(option0).toHaveClass('is-selected')
  });
});
