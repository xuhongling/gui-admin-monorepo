import type { ComputedRef, Ref } from 'vue';
/**
 * 任意类型的异步函数
 */
type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>;

/**
 * 任意类型的普通函数
 */
type AnyNormalFunction = (...arg: any[]) => any;

/**
 * 任意类型的函数
 */
type AnyFunction = AnyNormalFunction | AnyPromiseFunction;

/**
 *  T | null 包装
 */
type Nullable<T> = T | null;

/**
 * T | Not null 包装
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 字符串类型对象
 */
type Recordable<T> = Record<string, T>;

/**
 * 字符串类型对象（只读）
 */
interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T;
}

/**
 * setTimeout 返回值类型
 */
type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * setInterval 返回值类型
 */
type IntervalHandle = ReturnType<typeof setInterval>;

type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};

export {
  type AnyFunction,
  type AnyNormalFunction,
  type AnyPromiseFunction,
  type IntervalHandle,
  type NonNullable,
  type Nullable,
  type ReadonlyRecordable,
  type Recordable,
  type TimeoutHandle,
  type DynamicProps,
};
