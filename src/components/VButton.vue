<template>
  <button class="button" :style="`background: var(--col-${btnColor})`">
    <span v-if="step === 'base'"> <slot /></span>
    <span v-if="step === 'wait'" class="loader" />
    <span v-if="step === 'ok'"> <VIcon :name="'check-double'" /></span>
    <span v-if="step === 'error'"> <VIcon :name="'error'" /></span>
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    color: {
      type: String,
      default: 'main',
      validator(value) {
        return ['main', 'red'].includes(value);
      },
    },
    step: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'wait', 'ok', 'error'].includes(value);
      },
    },
  });

  const btnColor = computed(() => {
    if (props.color === 'red') return 'red';
    return 'main-dark';
  });
</script>

<style lang="scss">
  .button {
    width: 100%;
    padding: 1dvh;
    color: $col-revers;
    font-weight: 400;
    font-size: 1.2em;
    text-transform: uppercase;
    background: $col-main-dark;
    border: none;
    border-radius: 0.5dvh;
    outline: none;
    & svg {
      font-size: 1.2em;
    }
  }
</style>
