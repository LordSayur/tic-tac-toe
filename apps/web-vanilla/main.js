import "./style.css";
import { Game } from "@tic-tac-toe/core";

const game = new Game();

document.addEventListener("DOMContentLoaded", () => {
  const $startBtn = document.querySelector("#start");
  const $undoBtn = document.querySelector("#undo");
  const $redoBtn = document.querySelector("#redo");
  const $replayBtn = document.querySelector("#replay");
  const $board = document.querySelector("#board");
  const $winnerMessage = document.querySelector("#winner-message");

  $startBtn.addEventListener("click", startGame);
  $undoBtn.addEventListener("click", () => {
    game.undo();
    drawBoard(game.currentState, $board);
    setWinnerMessage("");
    check();
    setDisabledStateFor("undo", "redo");
  });
  $redoBtn.addEventListener("click", () => {
    game.redo();
    drawBoard(game.currentState, $board);
    check();
    setDisabledStateFor("undo", "redo");
  });
  $replayBtn.addEventListener("click", () => {
    game.replay(() => drawBoard(game.currentState, $board));
  });

  startGame();

  function startGame() {
    game.start();
    drawBoard(game.currentState, $board);
    setWinnerMessage("");
    setDisabledStateFor("undo", "redo");
  }

  function drawBoard(currentBoard, board) {
    board.innerHTML = "";
    currentBoard.forEach((rows, rowIndex) => {
      const $row = document.createElement("div");
      $row.classList.add("row");

      rows.forEach((col, colIndex) => {
        const $col = document.createElement("div");
        $col.classList.add("col");
        $col.setAttribute("data-row-index", rowIndex);
        $col.setAttribute("data-col-index", colIndex);
        $col.setAttribute("data-test", `cell-${rowIndex}-${colIndex}`);
        $col.addEventListener("click", makeMove);
        $col.appendChild(document.createTextNode(col));
        $row.appendChild($col);
      });
      board.appendChild($row);
    });
  }

  function makeMove(e) {
    if (game.winner) return;

    const $cell = e.target;
    const row = $cell.getAttribute("data-row-index");
    const col = $cell.getAttribute("data-col-index");
    game.makeMove({ row, col });
    drawBoard(game.currentState, $board);
    check();
    setDisabledStateFor("undo", "redo");
  }
  function check() {
    game.check();
    if (game.winner) setWinnerMessage(`The winner is ${game.winner}!`);
    if (!game.winner && !game.currentState.flat().includes("-"))
      setWinnerMessage("Its a tie!");
  }
  function setWinnerMessage(message) {
    $winnerMessage.innerHTML = message;
  }
  function setDisabledStateFor(...btnName) {
    if (btnName.includes("redo")) {
      game.canRedo
        ? $redoBtn.removeAttribute("disabled")
        : $redoBtn.setAttribute("disabled", "");
    }
    if (btnName.includes("undo")) {
      game.canUndo
        ? $undoBtn.removeAttribute("disabled")
        : $undoBtn.setAttribute("disabled", "");
    }
  }
});
