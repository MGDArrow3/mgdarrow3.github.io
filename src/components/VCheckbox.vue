<template>
  <div class="VCheckbox">
    <div class="VCheckbox__label" @click="$emit('update:modelValue', !modelValue)">
      <slot />
    </div>
    <div class="VCheckbox__box" @click="$emit('update:modelValue', !modelValue)">
      <VIcon v-if="modelValue" :name="'check'" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: Boolean,
  });
</script>

<style lang="scss">
  .VCheckbox {
    display: flex;
    flex-direction: row-reverse;
    gap: 1dvh;
    justify-content: left;
    height: 1.1em;
    margin: 1dvh 0 2dvh;
    font-size: 1.1em;
    line-height: 1.1em;
    &__label {
      width: max-content;
    }
    &__box {
      display: flex;
      height: 100%;
      font-size: 1.1em;
      border: 0.3dvh solid $col-text;
      aspect-ratio: 1 / 1;
      border-radius: 0.5dvh;
    }
  }
</style>
