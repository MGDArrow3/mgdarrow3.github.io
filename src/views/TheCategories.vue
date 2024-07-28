<template>
  <main class="categories">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="categories" />Категории</h1>
    </router-link>
    <VCardsBtn v-model="col" />
    <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
    <VCards :col="col">
      <VCardsItem
        v-for="category in searched"
        :key="category.id"
        :green="'Редактировать'"
        :red="'Удалить'"
        @clickGreen="clickGreen(category)"
        @clickRed="clickRed(category)"
      >
        <template v-slot:basic>
          {{ category.name }}
        </template>
        <template v-slot:open>
          <div class="info">
            <div class="info__name">Добавлено:</div>
            <div class="info__data">{{ Day.getFullText(category.created_at) }}</div>
            <div class="info__name">Добавил:</div>
            <div class="info__data">{{ category.created_user }}</div>
            <div class="info__name">Товары:</div>
            <div class="info__data">
              <span v-for="item in category?.ITEMS" :key="item.id">{{ item.name }}</span>
              <span v-if="!category?.ITEMS[0]">Товаров пока нет</span>
            </div>
          </div>
        </template>
      </VCardsItem>
      <VAdd @click="isAdd = true" />
    </VCards>
    <VPopup v-model="isAdd">
      <FCategoriesCreate @close="isAdd = false" />
    </VPopup>
    <VPopup v-model="isEdit">
      <FCategoriesUpdate :edit="editObj" @close="isEdit = false" />
    </VPopup>
    <VPopup v-model="isDelete">
      <FCategoriesDelete :deleteObj="deleteObj" @close="isDelete = false" />
    </VPopup>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import Day from '@/services/date';
  import Categories from '@/services/categories';
  import FCategoriesCreate from '@/components/forms/FCategoriesCreate.vue';
  import FCategoriesUpdate from '@/components/forms/FCategoriesUpdate.vue';
  import FCategoriesDelete from '@/components/forms/FCategoriesDelete.vue';
  import { ref, computed } from 'vue';

  const col = ref('c1');
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isDelete = ref(false);

  const editObj = ref({});
  const deleteObj = ref({});

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

  function clickGreen(category) {
    editObj.value = category;
    isEdit.value = true;
  }
  function clickRed(category) {
    deleteObj.value = category;
    isDelete.value = true;
  }
</script>
