export const required = (value: string) => {
  if (!value) {
    return 'Поле обязательно';
  }
  return undefined;
}
