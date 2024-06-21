<template>
  <div class="cards" :class="{ 'cards__col-1': col === 'c1', 'cards__col-2': col === 'c2' }">
    <slot />
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    col: {
      type: String,
      default: 'c1',
    },
  });
</script>

<style lang="scss">
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1dvh;
    align-items: center;
    width: 100%;
    overflow: auto;
    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.3dvh;
      color: $col-revers;
      font-size: 1.5em;
      text-transform: uppercase;
      background: $col-main-dark;
      border-radius: 1dvh;
    }
    &__col-1 {
      & .cards__item {
        width: 100%;
      }
    }
    &__col-2 {
      & .cards__item {
        width: calc((100% - 1dvh) / 2);
        font-size: 0.5em;
        & .cards__item-basic {
          min-height: 5.5dvh;
        }
        &--open {
          & .cards__item-open {
            min-height: 1.5dvh;
            padding: 0.8dvh;
          }
        }
      }
    }
  }
</style>
