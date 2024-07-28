<template>
  <RouterView />
  <VPopup v-model="pwa">
    <div class="pwa">
      <div class="pwa__title">Установить приложение на телефон?</div>
      <VButton @click="installPWA">Установить</VButton>
    </div>
  </VPopup>
</template>

<script setup>
  import { ref } from 'vue';

  const pwa = ref(false);

  let installPrompt = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    pwa.value = true;
  });

  async function installPWA() {
    if (!installPrompt) return;
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
  }

  function disableInAppInstallPrompt() {
    installPrompt = null;
    pwa.value = false;
  }
</script>

<style lang="scss">
  .pwa {
    left: 50%;
    width: 80vw;
    margin: 0 auto;
    padding: 1dvh;
    background: $col-main-light;
    border: 1dvh solid $col-text;
    border-radius: 1dvh;
    &__title {
      margin-bottom: 1dvh;
      font-weight: 600;
      font-size: 1.2em;
      text-align: center;
      text-transform: uppercase;
    }
  }
</style>
