import React, { FC, useRef, isValidElement, CSSProperties } from "react";
import { CSSTransition } from "react-transition-group";

interface CollapseTransition {
  key?: number | string;
  timeout?: number;
  classNames?: string;
  style?: CSSProperties;
}

export const CollapseTransition: FC<CollapseTransition> = (props) => {
  const { children, key, timeout, classNames, ...restProps } = props;
  const heightRef = useRef("");
  const defaultStyle = {
    transition: `all ${timeout}ms ease-in`,
  } 
  const transitionStyle = {
    exiting: {
      height: "0px",
      marginBottom: "0px",
      marginTop: "0px",
    },
  };
  return (
    <CSSTransition
      key={key}
      timeout={timeout as number}
      unmountOnExit
      classNames={classNames}
      onEnter={(node: HTMLElement) => {
        heightRef.current = node.offsetHeight + 'px' 
      }}
      onEntering={(node: HTMLElement) => {
        node.style.height = heightRef.current;
      }}
      {...restProps}
    >
      {(state) =>
        isValidElement(children) &&
        React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...transitionStyle[state as "exiting"],
          },
        })
      }
    </CSSTransition>
  );
};

CollapseTransition.defaultProps = {
  timeout: 200,
  classNames: "fade-in-top"
};

export default CollapseTransition;
