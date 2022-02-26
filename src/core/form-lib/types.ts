import { ComponentInternalInstance } from "vue";

export interface FormElementInjection {
  bind: (component: { uid: number }) => void;
  unbind: (uid: number) => void;
}
export type ComponentWithValidate = ComponentInternalInstance & { validate: () => boolean };
