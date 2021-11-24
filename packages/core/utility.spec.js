import { EMPTY_STATE } from "./constants";
import { cloneState } from "./utility";

describe("> Utility", () => {
  describe(">> cloneState", () => {
    it("should return cloned copy of passed state", () => {
      const clonedState = cloneState(EMPTY_STATE);

      expect(clonedState).toEqual(EMPTY_STATE);
    });
    it("should preserve passed state on mutating cloned state", () => {
      const clonedState = cloneState(EMPTY_STATE);

      clonedState[0][0] = "x";

      expect(EMPTY_STATE).toEqual([
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ]);
    });
  });
});
