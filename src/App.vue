<template>
  <VForm @on-submit="submitHandler">
    <FormInput v-model="values.name.value" :rules="rulesForField" />
    <button type="submit">submit</button>
    {{ value }}
  </VForm>
  <button @click="reset">reset</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VForm from "~/components/Form.vue";
import FormInput from "~/components/input.vue";
import { email, required } from "~/core/rules";
import { useForm } from "~/core/form-lib/useForm";

const value = ref("");

const ru = {
  name: {
    value: "",
    rules: [
      { rule: required, errorMessage: "Обязательное поле" },
      { rule: email, errorMessage: "Некорректный email" },
    ],
  },
};

const { values, submitHandler, reset } = useForm({
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

const rulesForField = [
  { rule: required, errorMessage: "Обязательное поле" },
  { rule: email, errorMessage: "Некорректный email" },
];

const submitForm = () => {
  console.log("submitted");
};
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
