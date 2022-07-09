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
 * 管理 Map 类型状态的 Hook。
 * @example 基础用法
```typescript
 * import React from 'react';
 * import useMap from 'jhooks/useMap';
 *
 * export default () => {
 *   const [map, { set, setNew, remove, reset, get }] = useMap<string | number, string>([
 *     ['msg', 'hello world'],
 *     [123, 'number type'],
 *   ]);
 *
 *   return (
 *     <div>
 *       <button type="button" onClick={() => set(String(Date.now()), new Date().toJSON())}>
 *         Add
 *       </button>
 *       <button
 *         type="button"
 *         onClick={() => setNew([['text', 'this is a new Map']])}
 *         style={{ margin: '0 8px' }}
 *       >
 *         Set new Map
 *       </button>
 *       <button type="button" onClick={() => remove('msg')} disabled={!get('msg')}>
 *         Remove 'msg'
 *       </button>
 *       <button type="button" onClick={() => reset()} style={{ margin: '0 8px' }}>
 *         Reset
 *       </button>
 *       <div style={{ marginTop: 16 }}>
 *         <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
 *       </div>
 *     </div>
 *   );
 * };
```
 * @param initialValue 可选项，传入默认的 Set 参数
 * @return {map} Map 对象
 * @return {`(key: any, value: any) => void`} set 添加元素
 * @return {`(key: any) => MapItem`} get 获取元素
 * @return {`(newMap: Iterable<[any, any]>) => void`} setNew 生成一个新的 Map 对象
 * @return {`(key: any) => void`} remove 移除元素
 * @return {`() => void`} reset 重置为默认值
 */
function useMap(initialValue) {
    var getInitValue = function () {
        return initialValue === undefined ? new Map() : new Map(initialValue);
    };
    var _a = __read((0, react_1.useState)(function () { return getInitValue(); }), 2), map = _a[0], setMap = _a[1];
    var set = function (key, entry) {
        setMap(function (prev) {
            var temp = new Map(prev);
            temp.set(key, entry);
            return temp;
        });
    };
    var setNew = function (newMap) {
        setMap(new Map(newMap));
    };
    var remove = function (key) {
        setMap(function (prev) {
            var temp = new Map(prev);
            temp.delete(key);
            return temp;
        });
    };
    var reset = function () { return setMap(getInitValue()); };
    var get = function (key) { return map.get(key); };
    return [
        map,
        {
            set: (0, useMemoizedFn_1.default)(set),
            setNew: (0, useMemoizedFn_1.default)(setNew),
            remove: (0, useMemoizedFn_1.default)(remove),
            reset: (0, useMemoizedFn_1.default)(reset),
            get: (0, useMemoizedFn_1.default)(get)
        }
    ];
}
exports.default = useMap;
//# sourceMappingURL=index.js.map