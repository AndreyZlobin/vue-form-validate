<template>
  <form @submit.prevent="submitHandler">
    <FormInput v-model="values.name.value" />
    <button type="submit">submit</button>
    {{ value }}
  </form>
  <button @click="reset">reset</button>
  <pre>{{ JSON.stringify(errors, 2, null) }}</pre>
  <pre>{{ JSON.stringify(data, 2, null) }}</pre>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VForm from "~/components/Form.vue";
import FormInput from "~/components/input.vue";
import { email, required } from "~/core/rules";
import { useForm } from "~/core/form-lib/useForm";

const value = ref("");

const { values, onSubmit, reset, errors, data, $error, $valid, $dirty } = useForm({
  name: {
    value: "",
    rules: [
      { rule: required, errorMessage: "Обязательное поле" },
      { rule: email, errorMessage: "Некорректный email" },
    ],
  },
  lastName: {
    value: "",
    rules: [
      { rule: required, errorMessage: "Обязательное поле" },
      { rule: email, errorMessage: "Некорректный email" },
    ],
  },
});

const submitHandler = () => onSubmit((data) => console.log(data));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
