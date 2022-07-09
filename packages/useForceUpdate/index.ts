import { useCallback, useState } from 'react';

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
export default function useForceUpdate(): () => void {
    const [, setState] = useState({});
    return useCallback(() => setState({}), []);
}
