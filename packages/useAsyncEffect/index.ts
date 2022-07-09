import { useEffect } from 'react';

/**
 *
 * @manager 陈隆德(chenlongde)
 *
 * useEffect 支持异步函数
 *
 * @example 基础用法
 * ```typescript
 * import useAsyncEffect from '@jhooks/useAsyncEffect';
 * import React, { useState } from 'react';
 *
 * function mockCheck(): Promise<boolean> {
 *   return new Promise((resolve) => {
 *     setTimeout(() => {
 *       resolve(true);
 *     }, 3000);
 *   });
 * }
 *
 * export default () => {
 *   const [pass, setPass] = useState<boolean>(null);
 *
 *   useAsyncEffect(async () => {
 *     setPass(await mockCheck());
 *   }, []);
 *
 *   return (
 *     <div>
 *       {pass === null && 'Checking...'}
 *       {pass === true && 'Check passed.'}
 *     </div>
 *   );
 * };
 * ```
 * @param effect 类似useEffect中第1个入参，副作用函数，支持async函数。
 * @param deps 类似useEffect中第2个入参，函数执行的依赖项
 */
export default function useAsyncEffect(
    effect: () => void,
    deps: React.DependencyList
): void {
    useEffect(() => {
        (async function () {
            await effect();
        })();
    }, deps);
}
