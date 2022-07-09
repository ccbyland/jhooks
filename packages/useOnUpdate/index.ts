import { useRef, useEffect } from 'react';

/**
 *
 * @manager 纪晓佼(jixiaojiao3)
 *
 * useOnUpdate 模拟componentDidUpdate
 *
 * @example 基础用法
 * ```typescript
 * import useOnUpdate from '@jhooks/useOnUpdate';
 *
 * useOnUpdate(() => {
 *    // do something
 * }, [props]);
 * ```
 * @param {fn: () => void} callback 回调函数，初始化不执行，仅在依赖变化触发更新时执行
 * @returns {dep?: any[]} 函数依赖
 */
export default function useOnUpdate(fn: () => void, dep?: any[]) {
    const ref = useRef({ fn, mounted: false });
    ref.current.fn = fn;

    useEffect(() => {
        if (!ref.current.mounted) {
            ref.current.mounted = true;
        } else {
            ref.current.fn();
        }
    }, dep);
}
