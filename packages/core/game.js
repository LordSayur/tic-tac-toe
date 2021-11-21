import { cloneState } from "./utility";

export class Game {
  #states;
  #stepIndex;
  #winner;
  get currentState() {
    return this.#states[this.#stepIndex];
  }
  get canUndo() {
    return this.#stepIndex > 0;
  }
  get canRedo() {
    return this.#stepIndex < this.#states.length - 1;
  }
  get allStates() {
    return this.#states;
  }
  get winner() {
    return this.#winner;
  }
  start(states = [EMPTY_STATE]) {
    this.#stepIndex = states.length - 1;
    this.#winner = null;
    this.#states = states;
  }
  makeMove({ row, col }) {
    let newState = cloneState(this.currentState);

    if (newState[row][col] != "-") return;

    newState[row][col] = this.#stepIndex % 2 == 0 ? "x" : "o";

    this.#stepIndex++;

    if (!this.#states[this.#stepIndex]) {
      this.#states.push(newState);
    } else {
      this.#states[this.#stepIndex] = newState;
    }
  }
  undo() {
    if (!this.canUndo) return;

    this.#stepIndex--;
  }
  redo() {
    if (!this.canRedo) return;
    this.#stepIndex++;
  }
  replay(playCallback, playSpeed = 1000) {
    this.#stepIndex = 0;
    playCallback && playCallback();
    const play = setInterval(() => {
      this.redo();
      playCallback && playCallback();
      if (!this.canRedo) {
        clearInterval(play);
      }
    }, playSpeed);
    return play;
  }
  check() {
    const currentStateFlat = cloneState(this.currentState).flat();

    WINNING_SEQUENCES.some((sequence, i) => {
      const check = [];
      this.#winner = null;

      const hasEmptyField = sequence.some((s) => {
        const marker = currentStateFlat[s];

        if (marker == "-") return true;

        check.push(marker);
      });

      if (hasEmptyField) return;

      const markers = [...new Set(check)];

      if (markers.length != 1) return;

      this.#winner = markers[0];

      return true;
    });
  }
}
export const EMPTY_STATE = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];
export const WINNING_SEQUENCES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
