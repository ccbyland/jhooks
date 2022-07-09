"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLatest_1 = __importDefault(require("@jhooks/useLatest"));
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
function useUnmount(fn) {
    var fnRef = (0, useLatest_1.default)(fn);
    (0, react_1.useEffect)(function () { return function () {
        fnRef.current();
    }; }, []);
}
exports.default = useUnmount;
//# sourceMappingURL=index.js.map