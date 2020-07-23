import React, { FC, HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  percent: number;
  backgroundColor?: string;
  barColor?: string;
  showText?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { height, percent, barColor, backgroundColor, ...restProps } = props;
  const outerStyle = {
    backgroundColor,
    height,
  };
  const barStyle = {
    width: `${percent}%`,
    backgroundColor: barColor,
  };
  console.log('progress', percent)
  return (
    <div className="wing-progressbar-wrapper" {...restProps}>
      <div className="wing-progressbar-outer" style={outerStyle}>
        <span className="wing-progressbar-inner" style={barStyle}></span>
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  height: "6px",
};

export default ProgressBar;
