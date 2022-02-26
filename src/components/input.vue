<template>
  <input type="text" @input="handlerInput" :value="modelValue"/>
</template>

<script lang="ts">
import {defineComponent, PropType,} from "vue";
import {Rule} from "~/core/validator";

export default defineComponent({
  name: "FormInput",
  props: {
    modelValue: {type: String as PropType<string>},
    rules: {type: Array as PropType<Rule<string>[]>, required: false}
  },
  setup(props, {emit}) {
    const handlerInput = (event: InputEvent) => {
      const {value} = <HTMLInputElement>event.target;
      emit("update:modelValue", value);
    };

    return {handlerInput};
  }
});
</script>
