import { useRef } from 'react';

/**
 *
 * @manager 曹智铭(caozhiming7)
 *
 * useRefProps 使得在组件的任何地方获取最新的props值
 *
 * @example 基础用法
 * ```typescript
 * import useRefProps from "@jhooks/useRefProps";
 *
 * function MyButton(props) {
 *  const propsRef = useRefProps(props)
 *  const handleClick = useCallback(() => {
 *    const { onClick } = propsRef.current
 *    if (onClick) {
 *      onClick()
 *    }
 *  }, [])
 *  return <div onClick={handleClick}></div>
 * }
 * ```
 * @param {props: T} 组件入参
 */
export default function useRefProps<T>(props: T) {
    const ref = useRef<T>(props);
    ref.current = props;
    return ref;
}
