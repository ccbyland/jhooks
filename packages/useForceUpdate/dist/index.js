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
 * @manager 纪晓佼(jixiaojiao3)
 *
 * 强制更新视图
 *
 * @example 基础用法
 * ```typescript
 * import useForceUpdate from "@jhooks/useForceUpdate";
 *
 * const forceUpdate = useForceUpdate();
 *
 * const handle = useCallback(() => {
 *
 *   forceUpdate();
 * }, [forceUpdate]);
 *
 * return (
 *   <>
 *     <View onClick={handle}>useForceUpdate</View>
 *   </>
 * );
 * ```
 *
 * @returns fn 更新视图的函数
 */
function useForceUpdate() {
    var _a = __read((0, react_1.useState)({}), 2), setState = _a[1];
    return (0, react_1.useCallback)(function () { return setState({}); }, []);
}
exports.default = useForceUpdate;
//# sourceMappingURL=index.js.map