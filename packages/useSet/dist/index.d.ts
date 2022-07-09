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
export default function useSet<K>(initialValue?: Iterable<K>): readonly [Set<K>, {
    readonly add: (key: K) => void;
    readonly remove: (key: K) => void;
    readonly reset: () => void;
}];
