import { useCallback, useRef } from 'react';
import useLatest from '@jhooks/useLatest';
type noop = (...args: any[]) => any;

/**
 *
 * @manager 梅亚敏(meiyamin)
 *
 * 用来处理节流函数的Hook
 *
 * @example 基础用法
 * ```typescript
 * import useThrottle from "@jhooks/useThrottle";
 *
 * const handle = useThrottle(() => {
 *   console.log(Date.now());
 * }, 500);
 *
 * return (
 *   <>
 *     <View onClick={handle}>useThrottle</View>
 *   </>
 * );
 * ```
 * @param {(...args: any[]) => any} fn 需要节流执行的函数
 * @param {number} wait 等待时间，单位为毫秒
 * @return {T} fn 触发执行 fn，函数参数将会传递给 fn
 */
export default function useThrottle<T extends noop>(fn: T, wait?: number): T {
    const fnRef = useLatest(fn);
    const time = useLatest<number | undefined>(undefined);
    return useCallback((...args: Parameters<T>) => {
        if (time.current) {
            return;
        }
        time.current = setTimeout(() => {
            fnRef.current(...args);
            time.current = 0;
        }, wait) as unknown as number;
    }, []) as T;
}
