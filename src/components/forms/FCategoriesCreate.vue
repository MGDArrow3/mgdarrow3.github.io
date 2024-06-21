<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Добавить категорию</legend>
      <VInput v-model="category" :type="'text'" :placeholder="'Название категории'">Категория:</VInput>
      <VButton :step="step">Добавить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Categories from '@/services/categories';

  const emit = defineEmits(['close']);

  const category = ref('');
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Categories.create(category.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
