<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Добавить получателя</legend>
      <VInput v-model="giver" :type="'text'" :placeholder="'Название организации или имя'">Получатель:</VInput>
      <VButton :step="step">Добавить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Givers from '@/services/givers';

  const emit = defineEmits(['close']);

  const giver = ref('');
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Givers.create(giver.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
