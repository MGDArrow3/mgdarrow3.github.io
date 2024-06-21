<template>
  <div
    class="cards__item cards__btn cards__open"
    :class="{ 'cards__btn--open': openBtn, 'cards__open--open': openOpen }"
    @click="if (open) clickCard = !clickCard;"
  >
    <div class="cards__item--block" :class="{ cards__light: !open }">
      <div class="cards__item-basic">
        <slot name="basic" />
      </div>
      <div class="cards__item-open">
        <slot name="open" />
      </div>
    </div>
    <VButtonsGroupe :green="green" :red="red" @clickGreen="$emit('clickGreen')" @clickRed="$emit('clickRed')" />
  </div>
</template>

<script setup>
  import VButtonsGroupe from '@/components/VButtonsGroupe.vue';
  import { computed, ref } from 'vue';
  const props = defineProps({
    green: {
      type: String,
      default: '',
    },
    red: {
      type: String,
      default: '',
    },
    open: {
      style: Boolean,
      default: true,
    },
  });

  const clickCard = ref(false);
  const isBtn = computed(() => props.green !== '' || props.red !== '');
  const openBtn = computed(() => isBtn.value && clickCard.value);
  const openOpen = computed(() => clickCard.value);
</script>

<style lang="scss">
  .cards__item {
    &--block {
      background: $col-main;
      border-radius: 1dvh;
    }
  }
  .cards__btn {
    & .btn-groupe {
      max-height: 0;
      overflow: hidden;
      transition: 0.2s ease-in-out;
    }
    &--open {
      & .btn-groupe {
        max-height: 100dvh;
        margin-top: 1dvh;
      }
    }
  }
  .cards__light {
    background: $col-main-light;
    border: 0.3dvh solid $col-main-dark;
  }
  .cards__open {
    & .cards__item-basic {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      min-height: 6.5dvh;
      max-height: 100dvh;
      font-weight: 500;
      font-size: 1.5em;
      text-align: center;
      text-transform: uppercase;
    }
    & .cards__item-open {
      min-height: 0;
      max-height: 0;
      overflow: hidden;
      transition: 0.2s ease-in-out;
    }
    &--open {
      & .cards__item-open {
        min-height: 6.5dvh;
        max-height: 100dvh;
        padding: 1dvh;
        background: $col-main-light;
        border-top: 0.2dvh solid $col-text;
        border-radius: 0 0 1dvh 1dvh;
      }
    }
  }
</style>
