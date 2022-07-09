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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 *
 * @manager 纪晓佼(jixiaojiao3)
 *
 * 给子组件传递固定的callback，防止子组件跟随父组件重复渲染
 *
 * 返回的callback是一个永远固定的函数，防止子组件重复渲染
 *
 * @example 基础用法
 * ```typescript
 * import useEventCb from "@jhooks/useEventCb";
 *
 * const clickHandler = useEventCb((...p)=>{
 *      // do something
 * });
 * ```
 * @template T 入参的泛型
 * @param fn 传入的原函数
 * @returns 返回的固定函数
 */
function useEventCb(fn) {
    var ref = (0, react_1.useRef)(fn);
    ref.current = (0, react_1.useMemo)(function () { return fn; }, [fn]);
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ref && ref.current.apply(ref, __spreadArray([], __read(args), false));
    }, []);
}
exports.default = useEventCb;
//# sourceMappingURL=index.js.map