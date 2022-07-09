import { useEffect, useRef } from 'react';
import useLatest from '@jhooks/useLatest';
type noop = (...args: any[]) => any;

/**
 *
 * @manager 曹智铭(caozhiming7)
 *
 * 一个可以处理 setTimeout 计时器函数的 Hook
 *
 * @example 基础用法
 * ```typescript
 * import React, { useState } from 'react';
 * import useTimeout from 'jhooks/useTimeout';
 *
 * export default () => {
 *     const [state, setState] = useState(1);
 *     useTimeout(() => {
 *         setState(state + 1);
 *     }, 3000);
 *     return <div>{state}</div>;
 * };
 * ```
 * @param {T} fn 要定时调用的函数
 * @param {number} wait 间隔时间，当取值 `undefined` 时会停止计时器
 * @param {{ immediate?: boolean }} options 配置计时器的行为
 */
export default function useTimeout<T extends noop>(
    fn: T,
    wait?: number,
    options?: {
        /**
         * 是否在首次渲染时立即执行
         *
         * @default false
         * @type {boolean}
         */
        immediate?: boolean;
    }
): React.MutableRefObject<number> {
    const fnRef = useLatest(fn);
    const timerRef = useRef(0);
    const initRef = useLatest(false);
    useEffect(() => {
        if (typeof wait !== 'number' || wait <= 0) return;
        const immediate = options?.immediate;
        if (immediate && !initRef.current) {
            initRef.current = true;
            fnRef.current();
        }
        timerRef.current = setTimeout(() => {
            fnRef.current();
        }, wait) as unknown as number;
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [wait]);
    return timerRef;
}
