
const completeIndices = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const getResult = ({ player, childState, getNextStates }) => {
  const {state, finalState} = childState;

  if (finalState != undefined) return finalState;

  // check for a win
  let i;
  for (i = 0; i < completeIndices.length; i += 1) {
    const indices = completeIndices[i];

    if (
      state[indices[0]] != undefined &&
      state[indices[0]] === state[indices[1]] &&
      state[indices[1]] === state[indices[2]]
    ) {
      childState.finalState = state[indices[0]];
      return childState.finalState;
    }
  }

  // check for a draw
  if (R.none(R.equals(undefined), state)) {
    childState.finalState = 0;
    return 0;
  }

  // select random move
  const possibleStates = getNextStates({ tree: childState, player });
  const nextState =
    possibleStates[Math.floor(Math.random() * possibleStates.length)];

  return getResult({
    player: player === 1 ? -1 : 1,
    childState: nextState,
    getNextStates
  });
};

export default getResult;
