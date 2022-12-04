export type KeyOfAsString<T> = {
  [K in keyof T]: string
};
