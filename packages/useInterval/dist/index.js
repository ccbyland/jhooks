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
function useInterval(fn, wait, options) {
    var fnRef = (0, useLatest_1.default)(fn);
    var timerRef = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(function () {
        if (typeof wait !== 'number' || wait <= 0)
            return;
        var immediate = options === null || options === void 0 ? void 0 : options.immediate;
        if (immediate) {
            fnRef.current();
        }
        timerRef.current = setInterval(function () {
            fnRef.current();
        }, wait);
        return function () {
            clearInterval(timerRef.current);
        };
    }, [wait]);
    return timerRef;
}
exports.default = useInterval;
//# sourceMappingURL=index.js.map