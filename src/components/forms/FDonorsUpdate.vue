<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Редактировать жертвователя</legend>
      <VInput v-model="donor" :type="'text'" :placeholder="'Название организации или имя'">Жертвователь:</VInput>
      <VButton :step="step">Изменить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Donors from '@/services/donors';

  const emit = defineEmits(['close']);
  const props = defineProps(['edit']);

  const donor = ref(props.edit.name);
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Donors.update(donor.value, props.edit.id);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
