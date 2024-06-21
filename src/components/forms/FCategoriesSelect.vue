<template>
  <VPopup v-model="isAdd">
    <FCategoriesCreate @close="isAdd = false" />
  </VPopup>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать категорию</legend>
      <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
      <VCards :col="'c2'">
        <VCardsItem v-for="category in searched" :key="category.id" :open="false" @click="select(category)">
          <template v-slot:basic>
            {{ category.name }}
          </template>
        </VCardsItem>
        <VAdd @click.stop="isAdd = true" />
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import Categories from '@/services/categories';
  import VAdd from '@/components/VAdd.vue';
  import FCategoriesCreate from '@/components/forms/FCategoriesCreate.vue';

  const emit = defineEmits(['close', 'select']);

  const isAdd = ref(false);

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Categories.arr.value;
    return Categories.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.name.toLowerCase().includes(v)),
    );
  });

  function select(category) {
    emit('select', category);
  }
</script>
