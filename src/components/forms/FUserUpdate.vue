<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Редактировать имя</legend>
      <VInput v-model="username" :type="'text'" v-bind="usernameAttrs" :placeholder="'Новое имя'">Новове имя:</VInput>
      <VErrors :errors="errors" />
      <VButton :step="step">Изменить</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import Auth from '@/services/auth';
  import VErrors from '@/components/VErrors.vue';
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';

  const emit = defineEmits(['close']);
  const step = ref('base');

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
      username: yup.string().min(4).required(),
    }),
  });

  const onSubmit = handleSubmit(async (values) => {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Auth.updateUsername(values.username);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';
    setTimeout(() => emit('close', false), 100);
  });

  const [username, usernameAttrs] = defineField('username');
</script>
