<template>
  <VPopup v-model="isSelectGiver">
    <FGiversSelect @close="isSelectGiver = false" @select="(e) => selectGiver(e)" />
  </VPopup>
  <main class="donate">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="give" />Раздать</h1>
    </router-link>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>Получатель</legend>
        <div class="btn-select" :class="{ 'btn-select--act': giver?.name }" @click="isSelectGiver = true">
          {{ giver.name || 'Выбрать получателя' }}
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
          {{ i.item.ITEMS?.name }}
        </template>
        <template v-slot:open>
          <div class="info">
            <div class="info__name">Количество:</div>
            <div class="info__data">
              {{ i.count }} / {{ i.countOld }} {{ Filter.getNumberCaseCi(i.item.ITEMS?.ci, i.countOld) }}
            </div>
            <div v-if="i.item.ITEMS.isLoss && Day.isNotMissLoss(i.item.loss)" class="info__name">Годен до:</div>
            <div v-if="i.item.ITEMS.isLoss && Day.isNotMissLoss(i.item.loss)" class="info__data">
              {{ Day.getFullText(i.item.loss) }}
            </div>
          </div>
        </template>
      </VCardsItem>
    </VCards>
    <FGive v-for="i in editItems" :key="i.tempId" :i="i" @save="(e) => saveItem(e)" />
    <VAdd @click="addNewItem()" />
    <VButton :step="step" class="donate__btn" @click="give()">Раздать</VButton>
  </main>
</template>

<script setup>
  import VAdd from '@/components/VAdd.vue';
  import FGive from '@/components/forms/FGive.vue';
  import FGiversSelect from '@/components/forms/FGiversSelect.vue';
  import Day from '@/services/date';
  import Filter from '@/services/filter';
  import Storage from '@/services/storage';
  import { computed, ref } from 'vue';

  const giver = ref({});
  const isSelectGiver = ref(false);

  const items = ref([]);
  const cardsItems = computed(() => items.value.filter((i) => i.save));
  const editItems = computed(() => items.value.filter((i) => !i.save));

  function addNewItem() {
    items.value.push({
      tempId: Date.now().toString(36) + Math.random().toString(36).substr(2),
      item: {},
      count: 0,
    });
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

  function selectGiver(e) {
    isSelectGiver.value = false;
    giver.value = e;
  }

  const step = ref('base');

  async function give() {
    if (step.value !== 'base' || step.value === 'ok') return;
    if (Object.keys(giver.value).length === 0) return;

    step.value = 'wait';
    let isDone = await Storage.donate(giver.value, items.value);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => {
      giver.value = {};
      items.value = [];
      step.value = 'base';
    }, 300);
  }
</script>

<style lang="scss">
  .donate {
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
