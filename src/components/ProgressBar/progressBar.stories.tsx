import React, { useState, useEffect } from "react";
import { ProgressBar } from "./progressBar";

export default {
  title: "Wing/ProgressBar",
  component: ProgressBar,
  includeStories: [], // or don't load this file at all
};

export const Basic = () => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent((lastPercent) => {
      console.log(lastPercent);
      return lastPercent >= 100 ? 0 : lastPercent + 1;
    });
  }, []);
  console.log("basic", percent);
  return <ProgressBar percent={percent} />;
};

Basic.story = {};

Basic.jsxCode = `
  () => {
    const [percent, setPercent] = useState(0)
    useEffect(() => {
      const timer = setInterval(() => {
        setPercent(lastPercent => {
          return lastPercent >= 100 ? 0 : lastPercent + 1
        })
      })
      return () => {
        clearInterval(timer)
      }
    }, [])
    return (
      <ProgressBar
        percent={percent}
      />
    );
  };
`;
