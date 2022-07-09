import Taro from '@tarojs/taro';
import { useRef, MutableRefObject } from 'react';

/**
 *
 * @manager 陈隆德(chenlongde)
 *
 * 比useEffect更早的调用，由绘制之后变为绘制之前，同时返回页面URL参数
 *
 * @example 基础用法
 * ```typescript
 * import useOnLoad from '@jhooks/useOnLoad';
 *
 * const { pageParams } = useOnLoad(async (pageParams) => {
 *     // 组件初始化逻辑
 *     // 从页面参数中读取skuId
 *     const { skuId } = pageParams.current;
 * });
 * ```
 * @template T 页面参数的泛型，调用者自己定义
 * @param {(pageParams?: T) => void} callback 初始化回调函数，类似小程序中onLoad，生命周期内只执行1次
 * @returns {{ pageParams: MutableRefObject<T> }} 页面参数的引用，可供后续使用
 */
export default function useOnLoad<T = Record<string, any>>(
    callback: (pageParams: T) => void
): {
    pageParams: MutableRefObject<T>;
} {
    const isLoaded = useRef(false);
    const pageParams = useRef<T>({} as T);
    if (!isLoaded.current) {
        isLoaded.current = true;
        Object.assign(
            pageParams.current,
            Taro.getCurrentInstance().router?.params || {}
        );
        callback(pageParams.current);
    }
    return { pageParams };
}
