import { cloneState } from "../utility";

export function makeMove({ row, col }, currentState, marker) {
  const newState = cloneState(currentState);

  if (!(marker && ["x", "o"].includes(marker)))
    throw new Error("You must provide marker either 'x' or 'o' only");

  if (newState[row][col] != "-") return null;

  newState[row][col] = marker;

  return newState;
}
