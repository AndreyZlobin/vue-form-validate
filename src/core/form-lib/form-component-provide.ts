import { provide, reactive } from "vue";
import { ProviderInjectEnums } from "~/core/form-lib/enums";
import { ComponentWithValidate } from "~/core/form-lib/types";

export function useFormProvide() {
  const state = reactive<{ validateComponents: ComponentWithValidate[] }>({
    validateComponents: [],
  });

  const bind = (component: ComponentWithValidate & { validate: () => boolean }) => {
    state.validateComponents.push(component);
  };
  const unbind = (uid: number) => {
    const index = state.validateComponents.findIndex((c) => c.uid === uid);
    if (index > -1) {
      state.validateComponents.splice(index, 1);
    }
  };
  const validate = () => {
    let valid = true;
    for (const component of state.validateComponents) {
      const result = component.validate();
      if (!result) {
        valid = false;
      }
    }
    return valid;
  };

  provide(ProviderInjectEnums.FORM, {
    bind,
    unbind,
  });

  return { validate, state };
}
