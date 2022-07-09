"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
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
function useRefProps(props) {
    var ref = (0, react_1.useRef)(props);
    ref.current = props;
    return ref;
}
exports.default = useRefProps;
//# sourceMappingURL=index.js.map