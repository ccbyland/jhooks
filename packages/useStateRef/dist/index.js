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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 *
 * @manager 王奕聪(wangyicong5)
 *
 * useStateRef 在useState的基础上扩展了一个返回值，用于获取state的最新值
 *
 * @example 基础用法
 * ```typescript
 * import useStateRef from '@jhooks/useStateRef';
 *
 * const [count, setCount, countRef] = useStateRef(0)
 * useEffect(() => {
 *    // 在组件卸载时保存当前的count
 *    setCount(countRef.current));
 * }, []);
 *
 * ```
 * @param {initialState: any} 初始化的值
 */
function useStateRef(initialState) {
    var ref = (0, react_1.useRef)();
    var _a = __read((0, react_1.useState)(function () {
        var value = typeof initialState === 'function' ? initialState() : initialState;
        ref.current = value;
        return value;
    }), 2), state = _a[0], setState = _a[1];
    var setValue = (0, react_1.useCallback)(function (value) {
        if (typeof value === 'function') {
            setState(function () {
                var finalValue = value();
                if (state === ref.current && finalValue === ref.current)
                    return;
                ref.current = finalValue;
                return finalValue;
            });
        }
        else {
            if (state === ref.current && value === ref.current)
                return;
            ref.current = value;
            setState(value);
        }
    }, []);
    return [state, setValue, ref];
}
exports.default = useStateRef;
//# sourceMappingURL=index.js.map