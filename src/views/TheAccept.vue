<template>
  <VPopup v-model="isSelectDonor">
    <FDonorsSelect @close="isSelectDonor = false" @select="(e) => selectDonor(e)" />
  </VPopup>
  <main class="accept">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="accept" />Принять</h1>
    </router-link>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>Жертвователь</legend>
        <div class="btn-select" :class="{ 'btn-select--act': donor?.name }" @click="isSelectDonor = true">
          {{ donor.name || 'Выбрать жертвователя' }}
        </div>
      </fieldset>
    </form>
    <VCards :col="'c1'">
      <VCardsItem
        v-for="i in cardsItems"
        :key="i.tempId"
        :green="'Редактировать'"
        :red="'Удалить'"
        @clickGreen="editItem(i)"
        @clickRed="deleteItem(i)"
      >
        <template v-slot:basic>
          {{ i.item.name }}
        </template>
        <template v-slot:open>
          <div class="info">
            <div class="info__name">Количество:</div>
            <div class="info__data">{{ i.count }} {{ Filter.getNumberCaseCi(i.item.ci, i.count) }}</div>
            <div v-if="i.item.isLoss && i.loss" class="info__name">Годен до:</div>
            <div v-if="i.item.isLoss && i.loss" class="info__data">{{ lossText(i.loss) }}</div>
          </div>
        </template>
      </VCardsItem>
    </VCards>
    <FAccept v-for="i in editItems" :key="i.tempId" :i="i" @save="(e) => saveItem(e)" />
    <VAdd @click="addNewItem()" />
    <VButton :step="step" class="accept__btn" @click="accept()">Принять</VButton>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import FAccept from '@/components/forms/FAccept.vue';
  import FDonorsSelect from '@/components/forms/FDonorsSelect.vue';
  import Day from '@/services/date';
  import Filter from '@/services/filter';
  import Storage from '@/services/storage';
  import { computed, ref } from 'vue';

  const donor = ref({});
  const isSelectDonor = ref(false);

  const items = ref([]);
  const cardsItems = computed(() => items.value.filter((i) => i.save));
  const editItems = computed(() => items.value.filter((i) => !i.save));

  function addNewItem() {
    items.value.push({
      tempId: Date.now().toString(36) + Math.random().toString(36).substr(2),
      item: {},
      count: 0,
      ci: {},
      loss: '',
    });
  }

  function lossText(loss) {
    let date = loss.split('-');
    date = `${date[0]}-${+date[1] + 1}-${date[2]}`;
    return Day.getFullText(date);
  }

  function saveItem(item) {
    const id = items.value.findIndex((i) => i.tempId === item.tempId);
    items.value[id] = item;
  }

  function editItem(item) {
    const id = items.value.findIndex((i) => i.tempId === item.tempId);
    items.value[id].save = false;
  }

  function deleteItem(item) {
    items.value = items.value.filter((i) => i.tempId !== item.tempId);
  }

  function selectDonor(e) {
    isSelectDonor.value = false;
    donor.value = e;
  }

  const step = ref('base');
  async function accept() {
    if (step.value !== 'base' || step.value === 'ok') return;
    if (Object.keys(donor.value).length === 0) return;

    step.value = 'wait';
    let isDone = await Storage.accept(donor.value, items.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => {
      donor.value = {};
      items.value = [];
      step.value = 'base';
    }, 300);
  }
</script>

<style lang="scss">
  .accept {
    height: 100dvh;
    overflow: auto;
    & * {
      overflow: visible;
    }
    &__btn {
      display: flex;
      width: 100%;
      padding: 1dvh;
      color: $col-revers;
      font-weight: 600;
      font-size: 1.6em;
      text-transform: uppercase;
      background: $col-main-dark;
      border: 0.5dvh solid $col-text;
      border-radius: 1dvh;
      place-content: center;
    }
  }
</style>
