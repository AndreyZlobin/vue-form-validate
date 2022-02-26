import { Rule } from "~/core/validator";
import { computed, ref } from "vue";

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
  const $valid = ref(true);
  const $error = ref(false);
  const $dirty = ref(false);
  const errors = ref({ ...resetError });
  const data = computed(() =>
    Object.fromEntries(
      (Object.keys(values.value) as Array<keyof typeof values.value>).map((it) => [
        [it],
        values.value[it].value,
      ]),
    ),
  );
  const _validate = () => {
    $dirty.value = true;
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
    console.log(errors.value);
    return $valid.value;
  };

  function reset() {
    for (const key in values.value) {
      // values.value[key].value = "";
    }
  }

  const onSubmit = (handler: (data: any) => void) => {
    console.log("we");
    _validate();
    handler(data.value);
  };

  return {
    onSubmit,
    reset,
    values,
    errors,
    $valid,
    $dirty,
    $error,
    data,
  };
}
