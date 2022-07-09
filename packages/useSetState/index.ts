import { useEffect, useRef, useState } from 'react';
type CallBack<T> = (state?: T) => void;

/**
 *
 * @manager 王奕聪(wangyicong5)
 *
 * @example 基础用法
 * ```typescript
 * import useSetState from "@jhooks/useSetState";
 *
 * const [example, setExample] = useSetState({
 *      name: '李华',
 *      age: 18,
 * });
 * const handle = () => {
 *      setExample({
 *          name: '小红',
 *          age: 18,
 *      }, (state) => {
 *          xxxxxx
 *      })
 * }
 * ```
 * @param {T} initState
 * @returns
 */
export default function useSetState<T>(initState: T | (() => T)): [T, any] {
    const [state, setState] = useState(initState);
    let isRunCallback = useRef<CallBack<T> | null>(null);
    const setUseState = (latestState: T | (() => T), callback: CallBack<T>) => {
        isRunCallback.current = callback;
        setState(latestState);
    };
    useEffect(() => {
        if (isRunCallback.current) isRunCallback.current(state);
    }, [state]);
    return [state, setUseState];
}
