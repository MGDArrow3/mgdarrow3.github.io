<template>
  <div class="cards__btns">
    <div
      class="cards__btns-item"
      :class="{ 'cards__btns-item-act': modelValue === 'all' }"
      @click="$emit('update:modelValue', 'all')"
    >
      <VIcon :name="'book'" />
    </div>
    <div
      class="cards__btns-item"
      :class="{ 'cards__btns-item-act': modelValue === 'month' }"
      @click="$emit('update:modelValue', 'month')"
    >
      <VIcon :name="'balance'" />
    </div>
    <div
      class="cards__btns-item"
      :class="{ 'cards__btns-item-act': modelValue === 'person' }"
      @click="$emit('update:modelValue', 'person')"
    >
      <VIcon :name="'people'" />
    </div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['modelValue']);
</script>

<style lang="scss">
  .cards__btns {
    display: flex;
    flex-wrap: nowrap;
    gap: 1dvh;
    &-item {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding: 0.3dvh;
      font-size: 1.3em;
      background: $col-main-light;
      border: 0.3dvh solid $col-text;
      border-radius: 1dvh;
      &-act {
        background: $col-main;
      }
    }
  }
</style>
