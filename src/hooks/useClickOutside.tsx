import { RefObject, useEffect } from "react";

function useClickOutside(
  onClickOutside: (event: MouseEvent) => void,
  domRef: RefObject<Element>
) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) return;
    const listener = (e: MouseEvent) => {
      // check target inside dom
      if(domRef.current?.contains(e.target as Node)) {
        return
      }
      onClickOutside(e);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [domRef, onClickOutside]);
}

export default useClickOutside;
