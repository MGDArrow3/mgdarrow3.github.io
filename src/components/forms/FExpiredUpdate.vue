<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Редактировать отображение просрочки</legend>
      <VInput v-model="expired" :type="'number'" :placeholder="'Количество месяцев'">Месяцев до предупреждения:</VInput>
      <VButton :step="step">Изменить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  const emit = defineEmits(['close']);
  const step = ref('base');
  const expired = ref(localStorage.getItem('expired'));

  function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    localStorage.setItem('expired', expired.value);

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
