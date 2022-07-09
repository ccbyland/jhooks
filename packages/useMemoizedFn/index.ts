import { useMemo, useRef } from 'react';

type noop = (...args: any[]) => any;
/**
 *
 * @manager 纪晓佼(jixiaojiao3)
 *
 * 持久化 function 的 Hook
 * 理论上，可以使用 useMemoizedFn 完全代替 useCallback
 * @example 基础用法
 * ```typescript
 * import useMemoizedFn from '@jhooks/useMemoizedFn';
 *
 * const [state, setState] = useState('');
 *
 * // 在 state 变化时，func 地址会变化
 * const func = useCallback(() => {
 *   console.log(state);
 * }, [state]);
 * ```
 * @template T 入参的泛型
 * @param fn 需要持久化的函数
 * @returns 引用地址永远不会变化的 fn
 */
export default function useMemoizedFn<T extends noop>(fn: T) {
    const fnRef = useRef<T>(fn);
    fnRef.current = useMemo(() => fn, [fn]);
    const memoizedFn = useRef<T>();
    if (!memoizedFn.current) {
        memoizedFn.current = function (...args) {
            return fnRef.current.apply(this, args);
        } as T;
    }
    return memoizedFn.current;
}
