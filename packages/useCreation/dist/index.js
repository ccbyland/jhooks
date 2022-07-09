"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function depsAreSame(oldDeps, deps) {
    if (oldDeps === deps)
        return true;
    for (var i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i]))
            return false;
    }
    return true;
}
/**
 *
 * @manager 陈钟杰(chenzhongjie3)
 *
 * useCreation 是 useMemo 或 useRef 的替代品。
 *
 * 因为 useMemo 不能保证被 memo 的值一定不会被重计算，而 useCreation 可以保证这一点。
 *
 * @example 基础用法
 * // 确保实例不会被重复创建
 * // 点击 "Rerender" 按钮，触发组件的更新，但 Foo 的实例会保持不变
 *
 * ```typescript
 * import React, { useState } from 'react';
 * import useCreation from '@jhooks/useCreation';
 *
 * class Foo {
 *   constructor() {
 *     this.data = Math.random();
 *   }
 *
 *   data: number;
 * }
 *
 * export default function () {
 *   const foo = useCreation(() => new Foo(), []);
 *   const [, setFlag] = useState({});
 *   return (
 *     <>
 *       <p>{foo.data}</p>
 *       <button
 *         type="button"
 *         onClick={() => {
 *           setFlag({});
 *         }}
 *       >
 *         Rerender
 *       </button>
 *     </>
 *   );
 * }
 * ```
 *
 * @param factory 用来创建所需对象的函数
 * @param deps 传入依赖变化的对象
 * @returns 实例
 */
function useCreation(factory, deps) {
    var current = (0, react_1.useRef)({
        deps: deps,
        obj: undefined,
        initialized: false
    }).current;
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = factory();
        current.initialized = true;
    }
    return current.obj;
}
exports.default = useCreation;
//# sourceMappingURL=index.js.map