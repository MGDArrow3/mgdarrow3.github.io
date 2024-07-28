<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Редактировать получателя</legend>
      <VInput v-model="giver" :type="'text'" :placeholder="'Название организации или имя'">Получатель:</VInput>
      <VButton :step="step">Изменить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Givers from '@/services/givers';

  const emit = defineEmits(['close']);
  const props = defineProps(['edit']);

  const giver = ref(props.edit.name);
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Givers.update(giver.value, props.edit.id);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
