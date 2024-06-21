<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Добавить жертвователя</legend>
      <VInput v-model="donor" :type="'text'" :placeholder="'Название организации или имя'">Жертвователь:</VInput>
      <VButton :step="step">Добавить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Donors from '@/services/donors';

  const emit = defineEmits(['close']);

  const donor = ref('');
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Donors.create(donor.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
