<template>
  <div class="errors">
    <div v-for="error in errors" :key="error.id" class="error">{{ ruError(error) }}</div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['errors']);

  function ruError(err) {
    if (err === 'username must be at least 4 characters') return 'Имя пользователя должно быть длинее 4-х символов!';
    if (err === 'email is a required field') return 'E-mail должен быть введён!';
    if (err === 'email must be a valid email') return 'E-mail введён не верно!';
    if (err === 'password must be at least 8 characters') return 'Пароль должен быть длинее 8-ми символов!';
    // if (err === 'password ') return 'Пароль должен быть длинее 8-ми символов!';
    return err;
  }
</script>

<style lang="scss">
  .errors {
    width: 100%;
    margin-bottom: 1dvh;
  }
</style>
