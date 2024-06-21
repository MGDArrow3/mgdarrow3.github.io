<template>
  <label class="input" :class="{ search: type === 'search' }">
    <span><slot /></span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :max="max"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const modelValue = defineModel();
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'number', 'email', 'search', 'password', 'search'].includes(value);
      },
    },
    placeholder: {
      type: String,
    },
    max: {
      type: Number,
    },
  });
</script>

<style lang="scss">
  .input {
    width: 100%;
    color: $col-text;
    font-size: 1.2em;
    & span {
      width: 100%;
      padding-left: 0.5dvh;
      font-size: 1.2em;
    }
    & input {
      width: 100%;
      height: 6.5dvh;
      margin-top: 0.5dvh;
      margin-bottom: 1.5dvh;
      padding: 1dvh;
      color: $col-text;
      background: transparent;
      border: none;
      border: 0.3dvh solid $col-text;
      border-radius: 0.5dvh;
      outline: none;
      &::placeholder {
        color: $col-text;
        opacity: 0.3;
      }
    }
  }
  .search {
    margin: 0;
    & input {
      margin: 0;
      &::-webkit-search-cancel-button {
        width: 1em;
        height: 1em;
        color: $col-text;
        background: url('@/assets/close.svg');
        background-position-x: center;
        background-size: 4.2vw;
        appearance: none;
      }
    }
    & span {
      display: none;
    }
  }
</style>
