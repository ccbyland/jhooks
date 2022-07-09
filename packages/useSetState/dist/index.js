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
 * @example 基础用法
 * ```typescript
 * import useSetState from "@jhooks/useSetState";
 *
 * const [example, setExample] = useSetState({
 *      name: '李华',
 *      age: 18,
 * });
 * const handle = () => {
 *      setExample({
 *          name: '小红',
 *          age: 18,
 *      }, (state) => {
 *          xxxxxx
 *      })
 * }
 * ```
 * @param {T} initState
 * @returns
 */
function useSetState(initState) {
    var _a = __read((0, react_1.useState)(initState), 2), state = _a[0], setState = _a[1];
    var isRunCallback = (0, react_1.useRef)(null);
    var setUseState = function (latestState, callback) {
        isRunCallback.current = callback;
        setState(latestState);
    };
    (0, react_1.useEffect)(function () {
        if (isRunCallback.current)
            isRunCallback.current(state);
    }, [state]);
    return [state, setUseState];
}
exports.default = useSetState;
//# sourceMappingURL=index.js.map