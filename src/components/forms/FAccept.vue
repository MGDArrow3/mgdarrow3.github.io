<template>
  <VPopup v-model="isSelectItem">
    <FItemsSelect @close="isSelectItem = false" @select="(e) => selectItem(e)" />
  </VPopup>
  <VPopup v-model="isSelectLoss">
    <VDatepeak @close="isSelectLoss = false" @select="(e) => selectLoss(e)" />
  </VPopup>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Принять товар</legend>
      <span class="btn-select__label">Товар:</span>
      <div class="btn-select" :class="{ 'btn-select--act': item?.name }" @click="isSelectItem = true">
        {{ item.name || 'Выбрать товар' }}
      </div>
      <div v-if="item?.name" class="form__double">
        <VInput v-model.number="count" :type="'number'">Количество:</VInput>
        <div class="btn-select" :class="{ 'btn-select--act': item.ci?.one }">
          {{ Filter.getNumberCaseCi(item.ci, count) || 'Ед. изм.' }}
        </div>
      </div>
      <div v-if="item?.isLoss">
        <span class="btn-select__label">Годен до:</span>
        <div class="btn-select" :class="{ 'btn-select--act': loss }" @click="isSelectLoss = true">
          {{ lossText || 'Срок годности' }}
        </div>
      </div>
      <VButton>Сохранить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import FItemsSelect from '@/components/forms/FItemsSelect.vue';
  import Filter from '@/services/filter';
  import Day from '@/services/date';

  const emit = defineEmits(['save']);
  const props = defineProps(['i']);

  const item = ref(props.i.item);
  const isSelectItem = ref(false);
  const count = ref(props.i.count);
  const ci = ref(props.i.ci);
  const isSelectLoss = ref(false);
  const loss = ref(props.i.loss);

  const lossText = computed(() => {
    if (loss.value === '') return;
    let date = loss.value.split('-');
    date = `${date[0]}-${+date[1] + 1}-${date[2]}`;
    return Day.getFullText(date);
  });

  const tempId = ref(props.i.tempId);

  function selectItem(e) {
    isSelectItem.value = false;
    item.value = e;
  }

  function selectLoss(e) {
    isSelectLoss.value = false;
    loss.value = e;
  }

  async function onSubmit() {
    const endItem = {
      item: item.value,
      count: count.value,
      ci: ci.value,
      loss: loss.value,
      save: true,
      tempId: tempId.value,
    };
    if (!endItem.count) return;
    emit('save', endItem);
  }
</script>
