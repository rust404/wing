import { RefObject, useEffect } from "react";

function useClickOutside(
  onClickOutside: (event: MouseEvent) => void,
  domRef: RefObject<Element>
) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) return;
    const listener = (e: MouseEvent) => {
      let target = e.target;
      // check target inside dom
      while (target !== null) {
        if (!(target instanceof Node)) return;
        if (target === dom) return;
        target = target.parentNode;
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
