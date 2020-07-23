import React, { useState } from "react";
import { AutoComplete } from "./autocomplete";

export default {
  title: "Wing/AutoComplete",
  component: AutoComplete,
  includeStories: [], // or don't load this file at all
};

export const Basic = () => {
  return (
    <AutoComplete
      dataSrc={[
        { value: "abc" },
        { value: "bcd" },
        { value: "cde" },
        { value: "def" },
      ]}
    />
  );
};

Basic.story = {
  parameters: { foo: "bar" },
};

Basic.jsxCode = `
  () => {
    return (
      <AutoComplete
        dataSrc={[
          { value: "abc" },
          { value: "bcd" },
          { value: "cde" },
          { value: "def" },
        ]}
      />
    );
  };
`;
