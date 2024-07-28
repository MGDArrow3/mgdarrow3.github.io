<template>
  <VPopup v-model="isSelectItem">
    <FStorageSelect @close="isSelectItem = false" @select="(e) => selectItem(e)" />
  </VPopup>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Раздать товар</legend>
      <span class="btn-select__label">Товар:</span>
      <div class="btn-select" :class="{ 'btn-select--act': item?.ITEMS?.name }" @click="isSelectItem = true">
        {{ nameText }}
      </div>
      <div v-if="item?.ITEMS?.name" class="form__double">
        <VInput v-model.number="count" :type="'number'" :max="item.count">Количество:</VInput>
        <div class="btn-select" :class="{ 'btn-select--act': item.ITEMS.ci?.one }">
          {{ Filter.getNumberCaseCi(item.ITEMS.ci, count) }}
        </div>
      </div>
      <VButton>Сохранить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import FStorageSelect from '@/components/forms/FStorageSelect.vue';
  import Filter from '@/services/filter';
  import Day from '@/services/date';

  const emit = defineEmits(['save']);
  const props = defineProps(['i']);

  const item = ref(props.i.item);
  const isSelectItem = ref(false);
  const count = ref(props.i.count);

  const nameText = computed(() => {
    if (!item.value?.ITEMS?.name) return 'Выбрать товар';
    let end = `${item.value?.ITEMS?.name} || ${item.value.count} ${Filter.getNumberCaseCi(item.value.ITEMS.ci, item.value.count)} `;
    if (item.value.ITEMS.isLoss && Day.isNotMissLoss(item.value.loss)) end += `|| ${Day.getFullText(item.value.loss)}`;
    return end;
  });

  const tempId = ref(props.i.tempId);

  function selectItem(e) {
    isSelectItem.value = false;
    item.value = e;
  }

  async function onSubmit() {
    const endItem = {
      item: item.value,
      count: count.value,
      countOld: item.value.count,
      save: true,
      tempId: tempId.value,
    };
    if (!endItem.count) return;
    emit('save', endItem);
  }
</script>
