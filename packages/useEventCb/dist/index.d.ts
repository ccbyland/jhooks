/**
 *
 * @manager 纪晓佼(jixiaojiao3)
 *
 * 给子组件传递固定的callback，防止子组件跟随父组件重复渲染
 *
 * 返回的callback是一个永远固定的函数，防止子组件重复渲染
 *
 * @example 基础用法
 * ```typescript
 * import useEventCb from "@jhooks/useEventCb";
 *
 * const clickHandler = useEventCb((...p)=>{
 *      // do something
 * });
 * ```
 * @template T 入参的泛型
 * @param fn 传入的原函数
 * @returns 返回的固定函数
 */
export default function useEventCb<T>(fn: (...p: T[]) => void): (...p: T[]) => void;
