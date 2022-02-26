<template>
  <input type="text" @input="handlerInput" :value="modelValue" />
  {{v$.errors}}
  <pre>v fdsfds - {{rValue}}</pre>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, watch } from "vue";
import { Rule, useValidator } from "~/core/validator";
import { useFormInjection } from "~/core/form-lib";

export default defineComponent({
  name: "FormInput",
  props: {
    modelValue: { type: String as PropType<string>},
    rules: { type: Array as PropType<Rule<string>[]>, required: true }
  },
  setup(props, { emit }) {
    const rootValue = ref(props.modelValue) as Ref<string>;
    watch(
      () => props.modelValue,
      (newValue) => {
        if (!newValue) {
          rootValue.value = "";
        }
        if (newValue) {
          rootValue.value = newValue;
        }
      },
    );
    const rValue = computed(() => props.modelValue)
    const { v$ } = useValidator(rValue, props.rules || []);
    useFormInjection(props.modelValue, props.rules);
    const handlerInput = (event: InputEvent) => {
      const { value } = <HTMLInputElement>event.target;
      emit("update:modelValue", value);
    };

    return { handlerInput, rootValue, v$, rValue};
  }
});
</script>
