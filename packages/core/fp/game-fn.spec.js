import { makeMove } from "./index";
import { EMPTY_STATE as emptyState } from "../constants";

describe("> game-fn", () => {
  describe(">> makeMove", () => {
    it("should return new state and preserve previous state", () => {
      const currentState = emptyState;

      const newStates = makeMove({ row: 1, col: 1 }, currentState, "x");

      expect(newStates).toEqual([
        ["-", "-", "-"],
        ["-", "x", "-"],
        ["-", "-", "-"],
      ]);
      expect(currentState).toEqual([
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ]);
    });
    it("should return null if current cell is marked", () => {
      const currentState = [
        ["-", "-", "-"],
        ["-", "x", "-"],
        ["-", "-", "-"],
      ];

      const newState = makeMove({ row: 1, col: 1 }, currentState, "x");

      expect(newState).toBeNull();
    });
    it("should throw error if invalid marker is passed", () => {
      expect(() => {
        makeMove({ row: 1, col: 1 }, emptyState, "z");
      }).toThrow("You must provide marker either 'x' or 'o' only");
      expect(() => {
        makeMove({ row: 1, col: 1 }, emptyState);
      }).toThrow("You must provide marker either 'x' or 'o' only");
      expect(() => {
        makeMove({ row: 1, col: 1 }, emptyState, null);
      }).toThrow("You must provide marker either 'x' or 'o' only");
      expect(() => {
        makeMove({ row: 1, col: 1 }, emptyState, undefined);
      }).toThrow("You must provide marker either 'x' or 'o' only");
    });
  });
});
