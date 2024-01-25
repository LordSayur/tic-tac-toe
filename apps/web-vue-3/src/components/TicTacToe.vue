<script setup>
import { Game } from "@tic-tac-toe/core";
import { ref } from "@vue/reactivity";

const game = new Game();

game.start();

const states = ref(game.currentState);
const makeMove = ({ row, col }) => {
  if (game.winner) return;
  game.makeMove({ row, col });
  states.value = game.currentState;
  game.check();
};
const redo = () => {
  game.redo();
  states.value = game.currentState;
  game.check();
};
const undo = () => {
  game.undo();
  states.value = game.currentState;
  game.check();
};
const start = () => {
  game.start();
  states.value = game.currentState;
};
const replay = () => {
  game.replay(() => (states.value = game.currentState));
};
</script>

<template>
  <h1>Tic Tac Toe</h1>
  <div id="board">
    <div v-for="(row, rowIndex) in states" key="rowIndex" class="row">
      <div
        v-for="(col, colIndex) in row"
        class="col"
        :data-test="`cell-${rowIndex}-${colIndex}`"
        @click="makeMove({ row: rowIndex, col: colIndex })"
      >
        {{ col }}
      </div>
    </div>
  </div>
  <div id="buttons">
    <button id="start" data-test="start" type="button" @click="start">
      Start
    </button>
    <button
      id="undo"
      data-test="undo"
      type="button"
      @click="undo"
      :disabled="!game.canUndo"
    >
      Undo
    </button>
    <button
      id="redo"
      data-test="redo"
      type="button"
      @click="redo"
      :disabled="!game.canRedo"
    >
      Redo
    </button>
    <button id="replay" data-test="replay" type="button" @click="replay">
      Replay
    </button>
  </div>
  <div id="winner-message" data-test="winner-message">
    <template v-if="game.winner"> The winner is {{ game.winner }}! </template>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: wheat;
}
button {
  margin: 0.1rem;
  padding: 0.5rem;
  border: none;
  background-color: wheat;
}
button:hover {
  color: goldenrod;
}
button:hover:disabled {
  color: rgba(16, 16, 16, 0.3);
}
#buttons {
  padding: 1rem;
}
#winner-message {
  color: wheat;
}
#board {
  margin: 2rem;
}
.row {
  display: flex;
  justify-content: center;
}
.col {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid wheat;
  height: 50px;
  width: 50px;
  color: wheat;
}
.col:hover {
  color: goldenrod;
}
</style>
