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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMemoizedFn_1 = __importDefault(require("@jhooks/useMemoizedFn"));
/**
 *
 * @manager 梅亚敏(meiyamin)
 *
 * 管理 Set 类型状态的 Hook。
 * @example 基础用法
 * ```typescript
 * import useSet from '@jhooks/useSet';
 *
 * export default () => {
 *   const [set, { add, remove, reset }] = useSet(['Hello']);
 *
 *   return (
 *     <div>
 *       <button type="button" onClick={() => add(String(Date.now()))}>
 *         Add Timestamp
 *       </button>
 *       <button
 *         type="button"
 *         onClick={() => remove('Hello')}
 *         disabled={!set.has('Hello')}
 *         style={{ margin: '0 8px' }}
 *       >
 *         Remove Hello
 *       </button>
 *       <button type="button" onClick={() => reset()}>
 *         Reset
 *       </button>
 *       <div style={{ marginTop: 16 }}>
 *         <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 * @param initialValue 可选项，传入默认的 Set 参数
 * @return {Set} Set 对象
 * @return {`(key: any) => void`} add 添加元素
 * @return {(key: any) => void} remove 移除元素
 * @return {() => void} reset 重置为默认值
 */
function useSet(initialValue) {
    var getInitValue = function () {
        return initialValue === undefined
            ? new Set()
            : new Set(initialValue);
    };
    var _a = __read((0, react_1.useState)(function () { return getInitValue(); }), 2), set = _a[0], setSet = _a[1];
    var add = function (key) {
        if (set.has(key)) {
            return;
        }
        setSet(function (prevSet) {
            var temp = new Set(prevSet);
            temp.add(key);
            return temp;
        });
    };
    var remove = function (key) {
        if (!set.has(key)) {
            return;
        }
        setSet(function (prevSet) {
            var temp = new Set(prevSet);
            temp.delete(key);
            return temp;
        });
    };
    var reset = function () { return setSet(getInitValue()); };
    return [
        set,
        {
            add: (0, useMemoizedFn_1.default)(add),
            remove: (0, useMemoizedFn_1.default)(remove),
            reset: (0, useMemoizedFn_1.default)(reset)
        }
    ];
}
exports.default = useSet;
//# sourceMappingURL=index.js.map