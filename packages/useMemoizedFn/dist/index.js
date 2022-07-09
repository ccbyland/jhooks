"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 *
 * @manager 纪晓佼(jixiaojiao3)
 *
 * 持久化 function 的 Hook
 * 理论上，可以使用 useMemoizedFn 完全代替 useCallback
 * @example 基础用法
 * ```typescript
 * import useMemoizedFn from '@jhooks/useMemoizedFn';
 *
 * const [state, setState] = useState('');
 *
 * // 在 state 变化时，func 地址会变化
 * const func = useCallback(() => {
 *   console.log(state);
 * }, [state]);
 * ```
 * @template T 入参的泛型
 * @param fn 需要持久化的函数
 * @returns 引用地址永远不会变化的 fn
 */
function useMemoizedFn(fn) {
    var fnRef = (0, react_1.useRef)(fn);
    fnRef.current = (0, react_1.useMemo)(function () { return fn; }, [fn]);
    var memoizedFn = (0, react_1.useRef)();
    if (!memoizedFn.current) {
        memoizedFn.current = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return fnRef.current.apply(this, args);
        };
    }
    return memoizedFn.current;
}
exports.default = useMemoizedFn;
//# sourceMappingURL=index.js.map