"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLatest_1 = __importDefault(require("@jhooks/useLatest"));
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
function useTimeout(fn, wait, options) {
    var fnRef = (0, useLatest_1.default)(fn);
    var timerRef = (0, react_1.useRef)(0);
    var initRef = (0, useLatest_1.default)(false);
    (0, react_1.useEffect)(function () {
        if (typeof wait !== 'number' || wait <= 0)
            return;
        var immediate = options === null || options === void 0 ? void 0 : options.immediate;
        if (immediate && !initRef.current) {
            initRef.current = true;
            fnRef.current();
        }
        timerRef.current = setTimeout(function () {
            fnRef.current();
        }, wait);
        return function () {
            clearTimeout(timerRef.current);
        };
    }, [wait]);
    return timerRef;
}
exports.default = useTimeout;
//# sourceMappingURL=index.js.map