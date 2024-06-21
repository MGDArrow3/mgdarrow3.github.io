<template>
  <Teleport to="body">
    <transition name="popup">
      <div v-if="modelValue" class="popup">
        <div class="popup__back" @click="$emit('update:modelValue', false)" />
        <div class="popup__body">
          <div class="popup__close" @click="$emit('update:modelValue', false)"><VIcon :name="'close'" /></div>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    modelValue: Boolean,
  });
</script>

<style lang="scss">
  .popup {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100dvh;
    &__back {
      position: absolute;
      width: 100%;
      height: 100%;
      background: $col-main-light;
      opacity: 0.9;
      content: ' ';
    }
    &__body {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 11;
      width: 100%;
      padding: 0 1dvh;
      transform: translate(-50%, -50%);
    }
    &__close {
      position: absolute;
      top: -2dvh;
      right: 1.5dvh;
      color: $col-text;
      font-size: 2em;
    }
  }

  // Анимация popupa
  .popup-enter-active,
  .popup-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .popup-enter-from,
  .popup-leave-to {
    opacity: 0;
  }
</style>
