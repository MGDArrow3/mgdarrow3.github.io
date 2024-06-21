<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Удалить категорию</legend>
      <h2>Действительно удалить?</h2>
      <h3>{{ categories }}</h3>
      <VButton :step="step" :color="'red'">Удалить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Categories from '@/services/categories';

  const emit = defineEmits(['close']);
  const props = defineProps(['deleteObj']);

  const categories = ref(props.deleteObj.name);
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Categories.delete(props.deleteObj.id);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
