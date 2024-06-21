<template>
  <div class="auth">
    <FAuth v-if="tab === 'Авторизация'" />
    <FReg v-if="tab === 'Регистрация'" />
    <div class="auth__tabs">
      <span @click="tab = 'Авторизация'">Авторизация</span> |
      <span @click="tab = 'Регистрация'">Регистрация</span>
    </div>
  </div>
</template>

<script setup>
  import FAuth from '@/components/forms/FAuth.vue';
  import FReg from '@/components/forms/FReg.vue';
  import { ref } from 'vue';

  const tab = ref('Авторизация');
</script>

<style lang="scss">
  .auth {
    width: 100vw;
    height: 100dvh;
    padding: 1dvh;
    overflow: hidden;
    & form {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 98vw;
      transform: translate(-50%, -50%);
    }
    &__tabs {
      position: absolute;
      bottom: 2dvh;
      left: 50%;
      text-align: center;
      transform: translateX(-50%);
    }
  }
</style>
