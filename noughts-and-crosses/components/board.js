import engine from "ui/logic/engine.js";

const {css} = Glamor;

const style = {
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  alignItems: "center",
  justifyContent: "center",
  " .grid": {
    display: "flex",
    flexDirection: "column",
    " .row": {
      display: "flex",
      flexDirection: "row",
      ":not(:last-child)": {borderBottom: "2px solid black"},
      " .cell": {
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        ":not(:last-child)": {borderRight: "2px solid black"},
        fontFamily: "arial, sans-serif",
        " .nought": {fontSize: "80px"},
        " .cross": {fontSize: "100px"}
      }
    }
  },
  ":not(.complete) .cell.clickable:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    cursor: "pointer"
  },
  " .message": {
    marginTop: 15,
    height: 30,
    font: "20px Arial, sans-serif"
  }
};

const getClassName = ({rowIndex, cellIndex}) => {
  const positions = ["top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right"];
  
  return positions[rowIndex * 3 + cellIndex];
}
const getCharacter = character => (character === 1) ? <i className="fas fa-times cross"></i> : (character === -1) ? <i className="fas fa-dot-circle nought"></i> : null;
const onClick = index => {
  engine.postMessage({
    type: "ACTION",
    payload: index
  });
};

export default ({store, board}) => {
  const {app: {nextStates}} = store.getState();
  //const message = getMessage(board);
  
  return <div {...Glamor.css(style)} className={""/*message ? "complete" : ""*/}>
    <div className="grid">{
      R.addIndex(R.map)((row, rowIndex) => {
        return <div key={rowIndex} className="row">{R.addIndex(R.map)((cell, cellIndex) => {
          const className = getClassName({rowIndex, cellIndex});
          const {description, index} = R.find(({description}) => className === description, nextStates) || {};

          return <div key={cellIndex} className={`cell ${className} ${description ? "clickable" : ""}`} onClick={(/*message || */description) ? () => onClick(index) : (() => {})}>
            {getCharacter(cell)}
          </div>;
        }, row)}</div>;
      }, R.splitEvery(3, board))
    }</div>
    {/*<div className="message">{message}</div>*/}
  </div>;
}
