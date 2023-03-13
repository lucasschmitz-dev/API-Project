export type ParseFunction<T> = (x: T) => T;

export function parseResponse<T>(
  data: any,
  parseFn?: ParseFunction<T>
): T | Array<T> | null {
  if (!data) {
    return null;
  }

  if (parseFn === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(parseFn);
  } else {
    return parseFn(data);
  }
}
