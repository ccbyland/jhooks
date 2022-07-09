import { useRef } from 'react';

/**
 *
 * @manager 陈钟杰(chenzhongjie3)
 *
 * 返回当前最新值的 Hook，可以避免闭包问题
 *
 * @example 基础用法
 * ```typescript
 * import React, { useState, useEffect } from 'react';
 * import useLatest from '@jhooks/useLatest';
 *
 * export default () => {
 *   const [count, setCount] = useState(0);
 *   const latestCountRef = useLatest(count);
 *   useEffect(() => {
 *     const interval = setInterval(() => {
 *       setCount(latestCountRef.current + 1);
 *     }, 1000);
 *     return () => clearInterval(interval);
 *   }, []);
 *   return (
 *     <>
 *       <p>count: {count}</p>
 *     </>
 *   );
 * };
 * ```
 * @template T 入参的泛型
 * @param {T} value 初始化的值
 * @returns {React.MutableRefObject<T>} 返回一个可变引用，可以获取最新值
 */
export default function useLatest<T>(value: T): React.MutableRefObject<T> {
    const ref = useRef(value);
    ref.current = value;
    return ref;
}
