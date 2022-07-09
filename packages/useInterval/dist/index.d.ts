/// <reference types="react" />
declare type noop = (...args: any[]) => any;
/**
 *
 * @manager 曹智铭(caozhiming7)
 *
 * 一个可以处理 setInterval 的 Hook
 *
 * @example
 * ```typescript
 * import React, { useState } from 'react';
 * import useInterval from '@jhooks/useInterval';
 *
 * export default () => {
 *   const [count, setCount] = useState(0);
 *   useInterval(() => {
 *     setCount(count + 1);
 *   }, 1000);
 *
 *   return <div>count: {count}</div>;
 * };
 * ```
 * @param {T} fn 要定时调用的函数
 * @param {number} wait 间隔时间，当取值 `undefined` 时会停止计时器
 * @param {{ immediate?: boolean }} options 配置计时器的行为
 */
export default function useInterval<T extends noop>(fn: T, wait?: number, options?: {
    /**
     * 是否在首次渲染时立即执行
     *
     * @default false
     * @type {boolean}
     */
    immediate?: boolean;
}): React.MutableRefObject<number>;
export {};
