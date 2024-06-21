<template>
  <div class="history__btns">
    <div class="history__btns-item rotate180" @click="sub">
      <VIcon :name="'angle'" />
    </div>
    <div class="history__btns-item history__btns-item-act" @click="set">
      {{ Day.getMonthText(modelValue) }}
    </div>
    <div class="history__btns-item" @click="add">
      <VIcon :name="'angle'" />
    </div>
  </div>
</template>

<script setup>
  import Day from '@/services/date';
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['update:modelValue']);

  function sub() {
    emit('update:modelValue', Day.subMonth(props.modelValue));
  }
  function set() {
    emit('update:modelValue', Date.now());
  }
  function add() {
    emit('update:modelValue', Day.addMonth(props.modelValue));
  }
</script>

<style lang="scss">
  .history__btns {
    display: flex;
    flex-wrap: nowrap;
    gap: 1dvh;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      padding: 0.3dvh;
      font-size: 1.5em;
      background: $col-main-light;
      border: 0.3dvh solid $col-text;
      border-radius: 1dvh;
      &-act {
        width: 75%;
        font-weight: 500;
        font-size: 1.2em;
        text-transform: uppercase;
        background: $col-main;
      }
    }
  }

  // Говно класс
  .rotate180 {
    transform: rotate(180deg);
  }
</style>
