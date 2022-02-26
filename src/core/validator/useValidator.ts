import { computed, ref } from "vue";
import { Rule } from "~/core/validator/types";
type ErrorStack = { errorMessage: string };

const resetError = {} as ErrorStack;

export function useValidator<Value>(fieldValue: Value, rules: Rule<Value>[]) {
  const _value = computed(() => fieldValue);
  const $valid = ref<boolean>(true);
  const $dirty = ref<boolean>(false);
  const $pending = ref<boolean>(false);
  const $error = ref<boolean>(false);
  const errors = ref<ErrorStack>({ ...resetError });

  function $touch(): void {
    $dirty.value = true;
    _validate();
  }

  function $onPending(): void {
    $pending.value = true;
  }

  function $reset(): void {
    $dirty.value = false;
    $valid.value = true;
    $error.value = false;
    errors.value = { ...resetError };
  }

  function _validate(): void {
    const errorStack: Array<Rule<Value>> = [];
    rules?.forEach((el) => {
      const isValid = el.rule(_value.value);
      if (!isValid) {
        errorStack.push(el);
        errors.value = { errorMessage: errorStack[0].errorMessage };
      } else {
        errors.value = { ...resetError };
      }
    });
    const errorLength = Object.keys(errors.value).length;
    $error.value = Boolean(errorLength);
    $valid.value = !errorLength;
    console.log(errors);
    console.log(_value.value);
  }

  const validate = () => {
    $touch();
    return $valid.value;
  };

  const v$ = {
    _value,
    $valid,
    $dirty,
    $error,
    errors,
    validate,
    $touch,
    $reset,
    $onPending,
  };

  return {
    v$,
  };
}
