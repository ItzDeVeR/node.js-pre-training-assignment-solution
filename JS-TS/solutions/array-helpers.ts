/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  if (source == null) throw new TypeError('source is required');

  const result: R[] = [];
  let i = 0;
  for (const item of source) {
    result.push(mapper(item, i));
    i++;
  }

  return result;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if (source == null) throw new TypeError('source is required');

  const result: T[] = [];
  let i = 0;
  for (const item of source) {
    if (predicate(item, i)) {
      result.push(item);
    }
  }

  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if (source == null) throw new TypeError('source is required');
  
  let result: R = initial;
  let i = 0;

  for (const item of source) {
    result = reducer(result, item, i);
    i++;
  }

  return result;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (source == null) throw new TypeError('source is required');
  
  const PASSED: T[] = [];
  const FAILED: T[] = [];

  for (const item of source) {
    if (predicate(item)) {
      PASSED.push(item);
    }
    else {
      FAILED.push(item);
    }
  }

  return [PASSED, FAILED];
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  if (source == null) throw new TypeError('source is required');
  
  const result: Record<K, T[]> = {} as Record<K, T[]>;

  for (const item of source) {
    const temp = keySelector(item);
    
    if (!result[temp]) {
      result[temp] = [];
    }

    result[temp].push(item);
  }

  return result;
}
