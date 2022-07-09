import { useRef, useState, useCallback } from 'react';

/**
 *
 * @manager 王奕聪(wangyicong5)
 *
 * useStateRef 在useState的基础上扩展了一个返回值，用于获取state的最新值
 *
 * @example 基础用法
 * ```typescript
 * import useStateRef from '@jhooks/useStateRef';
 *
 * const [count, setCount, countRef] = useStateRef(0)
 * useEffect(() => {
 *    // 在组件卸载时保存当前的count
 *    setCount(countRef.current));
 * }, []);
 *
 * ```
 * @param {initialState: any} 初始化的值
 */
export default function useStateRef(initialState: any) {
    const ref = useRef();

    const [state, setState] = useState(() => {
        const value =
            typeof initialState === 'function' ? initialState() : initialState;
        ref.current = value;
        return value;
    });

    const setValue = useCallback(value => {
        if (typeof value === 'function') {
            setState(() => {
                const finalValue = value();
                if (state === ref.current && finalValue === ref.current) return;
                ref.current = finalValue;
                return finalValue;
            });
        } else {
            if (state === ref.current && value === ref.current) return;
            ref.current = value;
            setState(value);
        }
    }, []);

    return [state, setValue, ref];
}
