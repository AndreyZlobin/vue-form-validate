export function email(value: string | number): boolean {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(`${value}`);
}

export function required(value: string | number): boolean {
  return Boolean(value);
}

export function minLength(min: number): (value: string | number) => boolean {
  return (value: string | number) => {
    if (isNaN(+value)) return false;
    return +value >= min;
  };
}

export function maxLength(min: number): (value: string | number) => boolean {
  return (value: string | number) => {
    if (isNaN(+value)) return false;
    return +value <= min;
  };
}
export function between(min: number, max: number): (value: string | number) => boolean {
  return (value: string | number) => {
    const v = +value;
    if (isNaN(v)) return false;
    return v >= min && v <= max;
  };
}

export const validators = {
  email,
  required,
  minLength,
  maxLength,
  between,
};
