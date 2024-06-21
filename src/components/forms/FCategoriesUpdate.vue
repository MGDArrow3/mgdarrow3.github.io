<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Редактировать категорию</legend>
      <VInput v-model="categories" :type="'text'" :placeholder="'Название категории'">Категория:</VInput>
      <VButton :step="step">Изменить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Categories from '@/services/categories';

  const emit = defineEmits(['close']);
  const props = defineProps(['edit']);

  const categories = ref(props.edit.name);
  const step = ref('base');

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Categories.update(categories.value, props.edit.id);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
