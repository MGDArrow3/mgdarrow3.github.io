<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Удалить жертвователя</legend>
      <h2>Действительно удалить?</h2>
      <h3>{{ donor }}</h3>
      <VButton :step="step" :color="'red'">Удалить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Donors from '@/services/donors';

  const emit = defineEmits(['close']);
  const props = defineProps(['deleteObj']);

  const donor = ref(props.deleteObj.name);
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Donors.delete(props.deleteObj.id);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
