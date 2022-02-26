import { getCurrentInstance, inject, onBeforeUnmount, onMounted } from "vue";
import { ProviderInjectEnums } from "~/core/form-lib/enums";
import { FormElementInjection } from "~/core/form-lib/types";

export function useFormInjection(validate: () => boolean) {
  const form = inject<FormElementInjection>(ProviderInjectEnums.FORM);
  const uid = getCurrentInstance()?.uid;
  onMounted(() => {
    form && uid && typeof validate === "function" && form.bind({ validate, uid });
  });
  onBeforeUnmount(() => {
    form && uid && form.unbind(uid);
  });
}
