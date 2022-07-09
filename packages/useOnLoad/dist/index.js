"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = __importDefault(require("@tarojs/taro"));
var react_1 = require("react");
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
function useOnLoad(callback) {
    var _a;
    var isLoaded = (0, react_1.useRef)(false);
    var pageParams = (0, react_1.useRef)({});
    if (!isLoaded.current) {
        isLoaded.current = true;
        Object.assign(pageParams.current, ((_a = taro_1.default.getCurrentInstance().router) === null || _a === void 0 ? void 0 : _a.params) || {});
        callback(pageParams.current);
    }
    return { pageParams: pageParams };
}
exports.default = useOnLoad;
//# sourceMappingURL=index.js.map