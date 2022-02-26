export interface Rule<T> {
  rule: (value: T) => boolean;
  errorMessage: string;
}
