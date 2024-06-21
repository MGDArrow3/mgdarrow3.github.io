<template>
  <form @submit="onSubmit">
    <fieldset>
      <legend>Регистрация</legend>
      <VInput v-model="username" :type="'text'" v-bind="usernameAttrs" :placeholder="'прот. Кирилл Щевелев'">
        Имя пользователя:
      </VInput>
      <VInput v-model="email" :type="'email'" v-bind="emailAttrs" :placeholder="'email@yandex.ru'">E-mail:</VInput>
      <VInput v-model="password" :type="'password'" v-bind="passwordAttrs">Пароль:</VInput>
      <VInput v-model="passwordConf" :type="'password'" v-bind="passwordConfAttrs">Повторный пароль:</VInput>
      <VErrors :errors="errors" />
      <VButton :step="step">Зарегистрироваться</VButton>
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
      username: yup.string().min(4).required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      passwordConf: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Пароли не совпадают!'),
    }),
  });

  const router = useRouter();
  const step = ref('base');

  const onSubmit = handleSubmit(async (values) => {
    if (step.value !== 'base' || step.value === 'ok') return;

    step.value = 'wait';
    let isDone = await Auth.signUp(values);

    if (!isDone) return (step.value = 'error');

    step.value = 'ok';

    router.push({ name: 'Menu' });
  });

  const [username, usernameAttrs] = defineField('username');
  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');
  const [passwordConf, passwordConfAttrs] = defineField('passwordConf');
</script>
