<template>
  <VPopup v-model="isAdd">
    <FItemsCreate @close="isAdd = false" />
  </VPopup>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать товар</legend>
      <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
      <VCards :col="'c2'">
        <div v-for="(groupe, category) in groupes" :key="groupe.id" class="cards">
          <div class="cards__title">{{ category }}</div>
          <VCardsItem v-for="item in groupe" :key="item.id" :open="false" @click="select(item)">
            <template v-slot:basic>
              {{ item.name }}
            </template>
          </VCardsItem>
        </div>
        <VAdd @click.stop="isAdd = true" />
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import Items from '@/services/items';
  import VAdd from '@/components/VAdd.vue';
  import FItemsCreate from '@/components/forms/FItemsCreate.vue';

  const groupes = computed(() => {
    return Object.groupBy(searched.value, (item) => item.CATEGORIES?.name || 'Без категории');
  });

  const emit = defineEmits(['close', 'select']);

  const isAdd = ref(false);

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Items.arr.value;
    return Items.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.name.toLowerCase().includes(v)),
    );
  });

  function select(item) {
    emit('select', item);
  }
</script>
