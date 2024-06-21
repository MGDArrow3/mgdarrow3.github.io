<template>
  <button class="add"><VIcon :name="'add'" /> Добавить</button>
</template>

<script setup></script>

<style lang="scss">
  .add {
    width: 100%;
    max-height: 10dvh;
    padding: 1dvh;
    overflow: hidden;
    color: $col-revers;
    font-weight: 500;
    font-size: 1.5em;
    letter-spacing: 0.1dvh;
    text-transform: uppercase;
    background: $col-main-light;
    border: 0.7dvh dashed $col-main-dark;
    border-radius: 1dvh;
    outline: none;
  }
</style>
