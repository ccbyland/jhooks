import { useCallback } from 'react';

/**
 *
 * @manager 陈钟杰(chenzhongjie3)
 *
 * 延时指定时间执行后面的代码，可代替setTimeout
 *
 * @example 基础用法
 * ```typescript
 * import useWait from "@jhooks/useWait";
 *
 * const wait = useWait();
 *
 * const handle = useCallback(async () => {
 *   console.error(Date.now());
 *   await wait(1000);
 *   console.error(Date.now());
 *   await wait(2000);
 *   console.error(Date.now());
 * }, [wait]);
 *
 * return (
 *   <>
 *     <View onClick={handle}>useWait</View>
 *   </>
 * );
 * ```
 *
 * @returns fn 延迟函数
 */
export default function useWait(): (time: number) => Promise<void> {
    return useCallback(async time => {
        await new Promise(resolve => setTimeout(resolve, time));
    }, []);
}
