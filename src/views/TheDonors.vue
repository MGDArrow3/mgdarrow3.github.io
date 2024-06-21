<template>
  <main class="donors">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="organization" />Жертвователи</h1>
    </router-link>
    <VCardsBtn v-model="col" />
    <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
    <VCards :col="col">
      <VCardsItem
        v-for="donor in searched"
        :key="donor.id"
        :green="'Редактировать'"
        :red="'Удалить'"
        @clickGreen="clickGreen(donor)"
        @clickRed="clickRed(donor)"
      >
        <template v-slot:basic>
          {{ donor.name }}
        </template>
        <template v-slot:open>
          <div class="info">
            <div class="info__name">Добавлено:</div>
            <div class="info__data">{{ Day.getFullText(donor.created_at) }}</div>
            <div class="info__name">Добавил:</div>
            <div class="info__data">{{ donor.created_user }}</div>
          </div>
        </template>
      </VCardsItem>
      <VAdd @click="isAdd = true" />
    </VCards>
    <VPopup v-model="isAdd">
      <FDonorsCreate @close="isAdd = false" />
    </VPopup>
    <VPopup v-model="isEdit">
      <FDonorsUpdate :edit="editObj" @close="isEdit = false" />
    </VPopup>
    <VPopup v-model="isDelete">
      <FDonorsDelete :deleteObj="deleteObj" @close="isDelete = false" />
    </VPopup>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import Day from '@/services/date';
  import Donors from '@/services/donors';
  import FDonorsCreate from '@/components/forms/FDonorsCreate.vue';
  import FDonorsUpdate from '@/components/forms/FDonorsUpdate.vue';
  import FDonorsDelete from '@/components/forms/FDonorsDelete.vue';
  import { computed, ref } from 'vue';

  const col = ref('c1');
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isDelete = ref(false);

  const editObj = ref({});
  const deleteObj = ref({});

  const search = ref('');
  const searched = computed(() => {
    if (!search.value) return Donors.arr.value;
    return Donors.arr.value.filter((i) =>
      search.value
        .toLowerCase()
        .split(' ')
        .every((v) => i.name.toLowerCase().includes(v)),
    );
  });

  function clickGreen(donor) {
    editObj.value = donor;
    isEdit.value = true;
  }
  function clickRed(donor) {
    deleteObj.value = donor;
    isDelete.value = true;
  }
</script>
