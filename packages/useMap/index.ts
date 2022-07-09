import { useState } from 'react';
import useMemoizedFn from '@jhooks/useMemoizedFn';

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
export default function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
    const getInitValue = () => {
        return initialValue === undefined ? new Map() : new Map(initialValue);
    };

    const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

    const set = (key: K, entry: T) => {
        setMap(prev => {
            const temp = new Map(prev);
            temp.set(key, entry);
            return temp;
        });
    };

    const setNew = (newMap: Iterable<readonly [K, T]>) => {
        setMap(new Map(newMap));
    };

    const remove = (key: K) => {
        setMap(prev => {
            const temp = new Map(prev);
            temp.delete(key);
            return temp;
        });
    };

    const reset = () => setMap(getInitValue());

    const get = (key: K) => map.get(key);

    return [
        map,
        {
            set: useMemoizedFn(set),
            setNew: useMemoizedFn(setNew),
            remove: useMemoizedFn(remove),
            reset: useMemoizedFn(reset),
            get: useMemoizedFn(get)
        }
    ] as const;
}
