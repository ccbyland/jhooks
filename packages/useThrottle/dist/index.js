"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useLatest_1 = __importDefault(require("@jhooks/useLatest"));
/**
 *
 * @manager 梅亚敏(meiyamin)
 *
 * 用来处理节流函数的Hook
 *
 * @example 基础用法
 * ```typescript
 * import useThrottle from "@jhooks/useThrottle";
 *
 * const handle = useThrottle(() => {
 *   console.log(Date.now());
 * }, 500);
 *
 * return (
 *   <>
 *     <View onClick={handle}>useThrottle</View>
 *   </>
 * );
 * ```
 * @param {(...args: any[]) => any} fn 需要节流执行的函数
 * @param {number} wait 等待时间，单位为毫秒
 * @return {T} fn 触发执行 fn，函数参数将会传递给 fn
 */
function useThrottle(fn, wait) {
    var fnRef = (0, useLatest_1.default)(fn);
    var time = (0, useLatest_1.default)(undefined);
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (time.current) {
            return;
        }
        time.current = setTimeout(function () {
            fnRef.current.apply(fnRef, __spreadArray([], __read(args), false));
            time.current = 0;
        }, wait);
    }, []);
}
exports.default = useThrottle;
//# sourceMappingURL=index.js.map