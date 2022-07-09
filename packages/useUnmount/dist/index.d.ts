/**
 *
 * @manager 陈钟杰(chenzhongjie3)
 *
 * 在组件卸载（unmount）时执行的 Hook。
 *
 *
 *
 * @example 基础用法
 *
 * ```typescript
 * import React, { useState } from 'react';
 * import useUnmount from '@jhooks/useUnmount';
 *
 * const MyComponent = () => {
 *   useUnmount(() => {
 *     console.log('unmount');
 *   });
 *
 *   return <p>Hello World!</p>;
 * };
 *
 * export default () => {
 *   const [state, setState] = useState(true);
 *
 *   const toggle = () => {
 *      setState(!state)
 *   }
 *
 *   return (
 *     <>
 *       <button type="button" onClick={toggle}>
 *         {state ? 'unmount' : 'mount'}
 *       </button>
 *      {state && <MyComponent />}
 *     </>
 *   );
 * };
 * ```
 * @param {() => void} fn 组件卸载时执行的函数
 */
declare function useUnmount(fn: () => void): void;
export default useUnmount;
