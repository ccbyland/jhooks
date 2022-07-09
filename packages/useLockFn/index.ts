import { useCallback, useRef } from 'react';

/**
 *
 * @manager 王奕聪(wangyicong5)
 *
 * 用于给一个异步函数增加竞态锁，防止并发执行。
 * @example 基础用法
 * ```typescript
 * import useLockFn from "@jhooks/useLockFn";
 *
 * const handle = useLockFn(() => {
 *   return new Promise<void>(resolve => {
 *     setTimeout(() => {
 *       resolve();
 *     }, 2000);
 *   });
 * });
 *
 * return (
 *   <>
 *     <View onClick={handle}>useLockFn</View>
 *   </>
 * );
 * ```
 * @export
 * @param {Function} fn 需要增加竞态锁的函数
 * @returns 增加了竞态锁的函数
 */
export default function useLockFn(fn: Function) {
    const lockRef = useRef(false);
    return useCallback(
        async (...args) => {
            if (lockRef.current) {
                return;
            }
            lockRef.current = true;
            try {
                const ret = await fn(...args);
                lockRef.current = false;
                return ret;
            } catch (e) {
                lockRef.current = false;
                throw e;
            }
        },
        [fn]
    );
}
