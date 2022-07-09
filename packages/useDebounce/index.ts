import { useCallback } from 'react';
import useLatest from '@jhooks/useLatest';
type noop = (...args: any[]) => any;

/**
 *
 * @manager 梅亚敏(meiyamin)
 *
 * 用来处理防抖函数的 Hook
 *
 * @example 基础用法
 * ```typescript
 * import useDebounce from "@jhooks/useDebounce";
 *
 * const handle = useDebounce(() => {
 *   console.log(Date.now());
 * }, 500);
 *
 * return (
 *   <>
 *     <View onClick={handle}>useDebounce</View>
 *   </>
 * );
 * ```
 * @param {T} fn 需要防抖执行的函数
 * @param {number} wait 等待时间，单位为毫秒
 * @return {T} fn 触发执行 fn，函数参数将会传递给fn
 */
export default function useDebounce<T extends noop>(fn: T, wait?: number): T {
    const fnRef = useLatest(fn);
    const time = useLatest<number | undefined>(undefined);
    return useCallback((...args: Parameters<T>) => {
        if (time.current) {
            clearTimeout(time.current);
        }
        time.current = setTimeout(() => {
            fnRef.current(...args);
        }, wait) as unknown as number;
    }, []) as T;
}
