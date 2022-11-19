import BestLines from "../components/best-lines.js";

const {css} = Glamor;

const movesStyle = {fontSize: "0.875rem"};

export default store => {
  const {app: {moves}} = store.getState();
  const movesDescription = R.pipe(
    R.splitEvery(2),
    R.addIndex(R.map)(([ply1, ply2], index) => `${index + 1}.${ply1}${ply2 ? ` ${ply2}` : ""}`),
    R.join(" ")
  )(moves);

  return [
    {
      title: "Best lines",
      panels: [<BestLines store={store}/>]
    },
    {
      title: "Moves",
      panels: [<div {...css(movesStyle)}>{movesDescription}</div>]
    },
    {
      title: "Training",
      panels: [<div>Section 1</div>, <div>Section 2</div>]
    }
  ];
};