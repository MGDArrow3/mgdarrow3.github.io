<template>
  <VPopup v-model="isSelectCategory">
    <FCategoriesSelect @close="isSelectCategory = false" @select="(e) => selectCategory(e)" />
  </VPopup>
  <VPopup v-model="isSelectCI">
    <VSelectCI @close="isSelectCI = false" @select="(e) => selectCI(e)" />
  </VPopup>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Добавить товар</legend>
      <VInput v-model="item" :type="'text'" :placeholder="'Название товара'">Товар:</VInput>
      <span class="btn-select__label">Категория:</span>
      <div class="btn-select" :class="{ 'btn-select--act': category?.name }" @click="isSelectCategory = true">
        {{ category.name || 'Выбрать категорию' }}
      </div>
      <span class="btn-select__label">Единица измерения:</span>
      <div class="btn-select" :class="{ 'btn-select--act': ci?.one }" @click="isSelectCI = true">
        {{ ci?.one || 'Выбрать единицу измерения' }}
      </div>
      <VCheckbox v-model="isLoss">Имеет срок годности</VCheckbox>
      <VButton :step="step">Добавить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Items from '@/services/items';
  import FCategoriesSelect from '@/components/forms/FCategoriesSelect.vue';
  import VSelectCI from '@/components/VSelectCI.vue';

  const emit = defineEmits(['close']);

  const category = ref({});
  const isSelectCategory = ref(false);
  const item = ref('');
  const isLoss = ref(false);
  const ci = ref({});
  const isSelectCI = ref(false);
  const step = ref('base');

  function selectCategory(e) {
    isSelectCategory.value = false;
    category.value = e;
  }
  function selectCI(e) {
    isSelectCI.value = false;
    ci.value = e;
  }

  async function onSubmit() {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Items.create(item.value, category.value, ci.value, isLoss.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  }
</script>
