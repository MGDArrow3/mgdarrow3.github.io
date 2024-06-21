<template>
  <main class="givers">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="givers" />Получатели</h1>
    </router-link>
    <VCardsBtn v-model="col" />
    <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
    <VCards :col="col">
      <VCardsItem
        v-for="giver in searched"
        :key="giver.id"
        :green="'Редактировать'"
        :red="'Удалить'"
        @clickGreen="clickGreen(giver)"
        @clickRed="clickRed(giver)"
      >
        <template v-slot:basic>
          {{ giver.name }}
        </template>
        <template v-slot:open>
          <div class="info">
            <div class="info__name">Добавлено:</div>
            <div class="info__data">{{ Day.getFullText(giver.created_at) }}</div>
            <div class="info__name">Добавил:</div>
            <div class="info__data">{{ giver.created_user }}</div>
          </div>
        </template>
      </VCardsItem>
      <VAdd @click="isAdd = true" />
    </VCards>
    <VPopup v-model="isAdd">
      <FGiversCreate @close="isAdd = false" />
    </VPopup>
    <VPopup v-model="isEdit">
      <FGiversUpdate :edit="editObj" @close="isEdit = false" />
    </VPopup>
    <VPopup v-model="isDelete">
      <FGiversDelete :deleteObj="deleteObj" @close="isDelete = false" />
    </VPopup>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import Day from '@/services/date';
  import Givers from '@/services/givers';
  import FGiversCreate from '@/components/forms/FGiversCreate.vue';
  import FGiversUpdate from '@/components/forms/FGiversUpdate.vue';
  import FGiversDelete from '@/components/forms/FGiversDelete.vue';
  import { ref, computed } from 'vue';

  const col = ref('c1');
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isDelete = ref(false);

  const editObj = ref({});
  const deleteObj = ref({});

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Givers.arr.value;
    return Givers.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.name.toLowerCase().includes(v)),
    );
  });

  function clickGreen(giver) {
    editObj.value = giver;
    isEdit.value = true;
  }
  function clickRed(giver) {
    deleteObj.value = giver;
    isDelete.value = true;
  }
</script>
