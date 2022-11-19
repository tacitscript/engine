
const directions = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right"
];

export default ({ player, tree: {state, finalState} }) => (finalState != undefined) ? [] : R.pipe(R.addIndex(R.map)((value, index) => value ? null : (() => {
  let result = state.slice(0);

  result[index] = player;

  return {
    state: result,
    description: directions[index],
    type: "click",
    bestLines: []
  };
})()), R.reject(R.equals(null)))(state);
