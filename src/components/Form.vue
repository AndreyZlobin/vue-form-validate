<template>
  <form @submit.prevent="onSubmit">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useFormProvide } from "~/core/form-lib";

export default defineComponent({
  name: "VForm",
  props: {
    resetFields: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    delay: {
      type: Number as PropType<number>,
      default: 300,
    },
  },
  emits: {
    "on-submit"() {
      return true;
    },
  },
  setup(props, ctx) {
    const { validate, state } = useFormProvide();
    const submitCallBack = () => {
      ctx.emit("on-submit");
    };

    const onSubmit = () => {
      ctx.emit("on-submit");
    };

    return {
      state,
      onSubmit,
    };
  },
});
</script>
