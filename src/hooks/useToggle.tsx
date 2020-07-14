import { useState } from "react";

function useToggle(initialState?: boolean) {
  const [state, setState] = useState(
    initialState !== undefined ? initialState : false
  );
  const toggle = () => {
    setState((bool) => !bool);
  };
  return [state, toggle];
}

export default useToggle;
