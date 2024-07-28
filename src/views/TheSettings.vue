<template>
  <main class="settings">
    <router-link :to="{ name: 'Menu' }">
      <h1><VIcon name="settings" />Настройки</h1>
    </router-link>
    <div class="settings__info">
      <div class="settings__info-title">Настройки пользователя</div>
      <div class="settings__info-name">Имя пользователя:</div>
      <div class="settings__info-data">{{ Auth.username.value }}</div>
      <div class="settings__info-name">Дата регистрации:</div>
      <div class="settings__info-data">{{ Day.getFullText(Auth.user.value.created_at) }}</div>
      <div class="settings__info-name">E-mail:</div>
      <div class="settings__info-data">{{ Auth.user.value.email }}</div>
    </div>
    <VButtonsGroupe :green="'Редактировать'" :red="'Выйти'" @clickGreen="clickGreen" @clickRed="clickRed" />

    <div class="settings__info">
      <div class="settings__info-title">Настройки отображения просрочки</div>
      <div class="settings__info-name">Отображать просрочку за:</div>
      <div class="settings__info-data">{{ expired }} месяца</div>
    </div>
    <VButtonsGroupe :green="'Редактировать'" @clickGreen="setExpired" />
    <span>v1.0.0</span>
    <VPopup v-model="isEdit">
      <FUserUpdate @close="isEdit = false" />
    </VPopup>
    <VPopup v-model="isEditExpired">
      <FExpiredUpdate @close="isEditExpired = false" />
    </VPopup>
  </main>
</template>

<script setup>
  import Auth from '@/services/auth';
  import Day from '@/services/date';
  import VButtonsGroupe from '@/components/VButtonsGroupe.vue';
  import FUserUpdate from '@/components/forms/FUserUpdate.vue';
  import FExpiredUpdate from '@/components/forms/FExpiredUpdate.vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  const router = useRouter();

  const isEdit = ref(false);
  const isEditExpired = ref(false);
  const expired = localStorage.getItem('expired');

  function clickGreen() {
    isEdit.value = true;
  }

  function setExpired() {
    isEditExpired.value = true;
  }

  async function clickRed() {
    await Auth.logOut();
    router.push({ name: 'Auth' });
  }
</script>

<style lang="scss">
  .settings__info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1.1em;
    &-title {
      width: 100%;
      margin-bottom: 1dvh;
      padding: 1dvh;
      color: $col-revers;
      font-size: 1.2em;
      text-align: center;
      text-transform: uppercase;
      background: $col-main;
      border-radius: 1dvh;
    }
    &-name {
      width: 40%;
      padding-right: 1dvh;
      font-weight: 600;
      text-align: right;
    }
    &-data {
      width: 60%;
    }
  }
</style>
