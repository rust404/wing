import React, {
  FC,
  useState,
  ChangeEventHandler,
  useRef,
  MouseEventHandler,
  FocusEventHandler,
} from "react";
import Input, { InputProps } from "../Input/input";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from 'classnames'

export type DataSource<T = {}> = T & {
  value: string;
};

interface AutoCompleteFilter {
  (obj: { value: string }, searchText: string):boolean;
}
export interface AutoCompleteProps extends InputProps {
  disabled?: boolean;
  dataSrc: DataSource[];
  filterOption?: AutoCompleteFilter
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { disabled, dataSrc, filterOption, ...restProps } = props;
  const [searchText, setSearchText] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const wrapperRef = useRef(null);
  const defaultFilter = () => true
  const dataFilter = filterOption || defaultFilter;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsSelected(false);
    setSearchText(e.target.value);
  };
  const handleSelect: MouseEventHandler<HTMLElement> = (e) => {
    console.log("selected", e.currentTarget.dataset.value);
    setIsSelected(true);
    setSearchText(e.currentTarget.dataset.value || "");
  };
  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocusing(true);
    setIsSelected(false)
  };
  // 不能用blur，用了blur点击li会失效，因为options会因为isFocusing消失
  useClickOutside(() => {
    setIsFocusing(false);
  }, wrapperRef);
  return (
    <div className="wing-autocomplete-wrapper" {...restProps} ref={wrapperRef}>
      <Input
        value={searchText}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={disabled}
      />
      <CSSTransition
        in={isFocusing && !isSelected}
        timeout={300}
        classNames="zoom-in-top"
        unmountOnExit
      >
        <ul className="wing-autocomplete-options">
          {dataSrc.length !== 0 &&
            dataSrc.filter((dataObj) => {
              return dataFilter(dataObj, searchText) 
            }).map(({ value }, index) => (
              <li className={
                classNames({
                  'is-selected': value === searchText
                })
              } key={index} data-value={value} onClick={handleSelect}>
                {value}
              </li>
            ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default AutoComplete;
