import React from "react";
import * as R from "ramda";
import FlipMove from "react-flip-move";

const {css} = Glamor;

const style = {
  " .best-line": {
    whiteSpace: "nowrap",
    fontSize: "0.875rem",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};

export default ({store}) => {
  const {app: {bestLines}} = store.getState();

  return <div {...css(style)}>
    <FlipMove>
      {R.map(({bestLine, actionIndex, opacity}) => <div key={actionIndex}><div className="best-line" style={{opacity, willChange: "opacity"}}>{bestLine}</div></div>, bestLines)}
    </FlipMove>
  </div>;
};