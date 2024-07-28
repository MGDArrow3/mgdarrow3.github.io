<template>
  <main class="items">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="item" />Товары</h1>
    </router-link>
    <VCardsBtn v-model="col" />
    <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
    <VCards :col="col">
      <div v-for="(groupe, category) in groupes" :key="groupe.id" class="cards">
        <div class="cards__title">{{ category }}</div>
        <VCardsItem
          v-for="item in groupe"
          :key="item.id"
          :green="'Редактировать'"
          :red="'Удалить'"
          @clickGreen="clickGreen(item)"
          @clickRed="clickRed(item)"
        >
          <template v-slot:basic>
            {{ item.name }}
          </template>
          <template v-slot:open>
            <div class="info">
              <div class="info__name">Добавлено:</div>
              <div class="info__data">{{ Day.getFullText(item.created_at) }}</div>
              <div class="info__name">Добавил:</div>
              <div class="info__data">{{ item.created_user }}</div>
              <div class="info__name">Ед. измерения:</div>
              <div class="info__data">
                <span style="text-transform: capitalize">{{ item.ci.one }}</span>
              </div>
              <div class="info__name">Срок годности:</div>
              <div class="info__data">
                <span v-if="item.isLoss"><VIcon :name="'check'" /> Имеет</span>
                <span v-else><VIcon :name="'close'" /> Не имеет</span>
              </div>
            </div>
          </template>
        </VCardsItem>
      </div>
      <VAdd @click="isAdd = true" />
    </VCards>
    <VPopup v-model="isAdd">
      <FItemsCreate @close="isAdd = false" />
    </VPopup>
    <VPopup v-model="isEdit">
      <FItemsUpdate :edit="editObj" @close="isEdit = false" />
    </VPopup>
    <VPopup v-model="isDelete">
      <FItemsDelete :deleteObj="deleteObj" @close="isDelete = false" />
    </VPopup>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import Day from '@/services/date';
  import Items from '@/services/items';
  import FItemsCreate from '@/components/forms/FItemsCreate.vue';
  import FItemsUpdate from '@/components/forms/FItemsUpdate.vue';
  import FItemsDelete from '@/components/forms/FItemsDelete.vue';
  import { computed, ref } from 'vue';

  const groupes = computed(() => {
    return Object.groupBy(searched.value, (item) => item.CATEGORIES?.name || 'Без категории');
  });

  const col = ref('c1');
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isDelete = ref(false);

  const editObj = ref({});
  const deleteObj = ref({});

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

  function clickGreen(item) {
    editObj.value = item;
    isEdit.value = true;
  }
  function clickRed(item) {
    deleteObj.value = item;
    isDelete.value = true;
  }
</script>
