import { Game, EMPTY_STATE as emptyState } from "./index";

describe("> Game", () => {
  describe(">> on start", () => {
    it("should start a game with empty initial state by default", () => {
      const game = new Game();

      game.start();

      expect(game.currentState).toEqual(emptyState);
    });
    it("should be able start a game with supplied states", () => {
      const currentState = [
        ["-", "-", "-"],
        ["-", "x", "-"],
        ["-", "-", "-"],
      ];
      const game = new Game();

      game.start([emptyState, currentState]);

      expect(game.currentState).toEqual(currentState);
    });
    it("should restart game on another call", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      game.start();

      expect(game.currentState).toEqual(emptyState);
    });
  });
  describe(">> on make move", () => {
    it("should be able to mark a cell", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      expect(game.currentState[1][1]).toEqual("x");
    });
    it("should preserve previous state(s)", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      expect(game.allStates.length).toEqual(2);
      expect(game.allStates[0]).toEqual(emptyState);
    });
    it("should not allow overriding marked cell", () => {
      const game = new Game();

      game.start();

      game.makeMove({ row: 1, col: 1 });
      game.makeMove({ row: 1, col: 1 });
      expect(game.currentState[1][1]).toEqual("x");
    });
    it("should mark cell with alternate symbol", () => {
      const game = new Game();

      game.start();

      game.makeMove({ row: 1, col: 1 });
      expect(game.currentState[1][1]).toEqual("x");

      game.makeMove({ row: 0, col: 0 });
      expect(game.currentState[0][0]).toEqual("o");

      game.makeMove({ row: 1, col: 0 });
      expect(game.currentState[1][0]).toEqual("x");
    });
  });
  describe(">> on undo", () => {
    it("should show previous state", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      game.undo();

      expect(game.currentState).toEqual(emptyState);
    });
    it("should not be able to revert state if its a first state", () => {
      const game = new Game();

      game.start();
      game.undo();

      expect(game.currentState).toEqual(emptyState);
    });
    it("should override next state on make move after undo", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      game.makeMove({ row: 0, col: 0 });
      game.undo();
      game.makeMove({ row: 2, col: 2 });

      expect(game.currentState).toEqual([
        ["-", "-", "-"],
        ["-", "x", "-"],
        ["-", "-", "o"],
      ]);
      expect(game.allStates.length).toEqual(3);
    });
  });
  describe(">> on redo", () => {
    it("should show next state", () => {
      const game = new Game();

      game.start();
      game.makeMove({ row: 1, col: 1 });
      game.undo();
      game.redo();

      expect(game.currentState).toEqual([
        ["-", "-", "-"],
        ["-", "x", "-"],
        ["-", "-", "-"],
      ]);
    });
    it("should not be able to revert state if its a last state", () => {
      const game = new Game();

      game.start();
      game.redo();

      expect(game.currentState).toEqual(emptyState);
    });
  });
  describe(">> on replay", () => {
    it("should replay all states from the beginning", () => {
      const game = new Game();
      jest.useFakeTimers();
      game.start();
      game.makeMove({ row: 1, col: 1 });
      game.makeMove({ row: 0, col: 0 });
      game.makeMove({ row: 2, col: 2 });
      game.replay(() => console.log("draw"));
      expect(game.currentState).toEqual(game.allStates[0]);
      jest.advanceTimersByTime(1000);
      expect(game.currentState).toEqual(game.allStates[1]);
      jest.advanceTimersByTime(1000);
      expect(game.currentState).toEqual(game.allStates[2]);
      jest.runAllTimers();
      expect(game.currentState).toEqual(game.allStates[3]);
    });
  });
  describe(">> on check", () => {
    it("should return null if no winner", () => {
      const game = new Game();

      game.start();
      game.check();

      expect(game.winner).toBeFalsy();
    });
    it("should return a winner", () => {
      const game = new Game();

      game.start([
        [
          ["o", "o", "x"],
          ["x", "x", "x"],
          ["-", "o", "-"],
        ],
      ]);
      game.check();

      expect(game.winner).toEqual("x");
    });
  });
});
