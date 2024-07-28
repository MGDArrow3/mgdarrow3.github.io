<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend>Авторизация</legend>
      <VInput v-model="email" :type="'email'" v-bind="emailAttrs" :placeholder="'email@yandex.ru'">E-mail:</VInput>
      <VInput v-model="password" :type="'password'" v-bind="passwordAttrs">Пароль:</VInput>
      <VErrors :errors="errors" />
      <VButton>Авторизоваться</VButton>
    </fieldset>
  </form>
</template>

<script setup>
  import VErrors from '@/components/VErrors.vue';
  import Auth from '@/services/auth';
  import { useForm } from 'vee-validate';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import * as yup from 'yup';

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
  });

  const router = useRouter();
  const step = ref('base');

  const onSubmit = handleSubmit(async (values) => {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Auth.signIn(values);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';

    router.push({ name: 'Menu' });
  });

  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');
</script>
