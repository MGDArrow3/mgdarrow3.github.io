<template>
  <VPopup v-model="isAdd">
    <FDonorsCreate @close="isAdd = false" />
  </VPopup>
  <form @submit.prevent>
    <fieldset>
      <legend>Выбрать жертвователя</legend>
      <VInput v-model="search" :placeholder="'Поиск...'" :type="'search'" />
      <VCards :col="'c2'">
        <VCardsItem v-for="donor in searched" :key="donor.id" :open="false" @click="select(donor)">
          <template v-slot:basic>
            {{ donor.name }}
          </template>
        </VCardsItem>
        <VAdd @click.stop="isAdd = true" />
      </VCards>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import Donors from '@/services/donors';
  import VAdd from '@/components/VAdd.vue';
  import FDonorsCreate from '@/components/forms/FDonorsCreate.vue';

  const emit = defineEmits(['close', 'select']);

  const isAdd = ref(false);

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

  function select(donor) {
    emit('select', donor);
  }
</script>
