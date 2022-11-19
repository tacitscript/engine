const initialState = {
  bestLines: [],
  board: [],
  nextStates: [],
  moves: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "STATE": return {...state, ...action.payload};
    case "MOVE": return (({board, nextStates, description}) => ({...state, board, nextStates, moves: [...state.moves, ...(description ? [description] : [])]}))(action.payload);
    case "BEST_LINES": return {...state, bestLines: action.payload};
  }

  return state;
}