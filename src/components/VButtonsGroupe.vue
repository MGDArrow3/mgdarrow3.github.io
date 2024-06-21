<template>
  <div class="btn-groupe">
    <VButton v-if="green !== ''" class="btn-groupe__btn" @click.stop="$emit('clickGreen')">
      {{ green }}
    </VButton>
    <VButton v-if="red !== ''" class="btn-groupe__btn" :color="'red'" @click.stop="$emit('clickRed')">
      {{ red }}
    </VButton>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    green: {
      type: String,
      default: '',
    },
    red: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss">
  .btn-groupe {
    display: flex;
    gap: 1dvh;
    width: 100%;
  }
</style>
