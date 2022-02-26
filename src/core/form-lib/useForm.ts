import { Rule } from "~/core/validator";
import { ref } from "vue";

const otions = {};

// interface

type RuleItem = Rule<string>;

interface Value {
  value: string;
  rules: Array<RuleItem>;
}

type Fields<T extends string> = Record<T, Value>;

export function useForm<T extends string>(fields: Fields<T>) {
  type KeyOfFields = keyof typeof fields;
  type ErrorStack = Record<KeyOfFields, RuleItem["errorMessage"]>;

  const resetError = {} as ErrorStack;
  const values = ref(fields);
  const $valid = ref<boolean>(true);
  const $error = ref<boolean>(false);
  const errors = ref<ErrorStack>({ ...resetError });

  function _validate(): void {
    for (const key in fields) {
      const field = fields[key];
      for (const rule of field.rules) {
        const isValid = rule.rule(field.value);
        if (!isValid) {
          if (!errors.value[key]) {
            errors.value[key] = { errorMessage: rule.errorMessage };
          }
        } else {
          delete errors.value[key];
        }
      }
    }

    const errorLength = Object.keys(errors.value).length;
    $error.value = Boolean(errorLength);
    $valid.value = !errorLength;
  }

  function reset() {
    for (const key in values.value) {
      // values.value[key].value = "";
    }
  }

  const submitHandler = () => {
    _validate();
  };

  return {
    submitHandler,
    reset,
    values,
    errors,
  };
}
