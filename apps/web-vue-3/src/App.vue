<script setup>
import TicTacToe from "./components/TicTacToe.vue";
</script>

<template>
  <TicTacToe />
</template>

<style>
html,
body {
  background-color: darkslategrey;
  height: 100%;
  margin: 0;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
