"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var taro_1 = __importDefault(require("@tarojs/taro"));
var useThrottle_1 = __importDefault(require("@jhooks/useThrottle"));
/**
 *
 * IntersectionObserver封装
 *
 * @export
 * @param {{
 *     intersectionObserver?: Taro.createIntersectionObserver.Option;
 *     relativeToViewport?: Taro.IntersectionObserver.RelativeToViewportMargins;
 * }} [options]
 * @returns {(Taro.IntersectionObserver | null)}
 */
var isIntersectionObserverReport = false;
function getIntersectionObserver(options) {
    var _a;
    // 默认的元素可见阈值
    var defaulThresholds = [0, 0.75, 1];
    var observerOptions = {
        // null 为相对于视窗，也可为具体要监测的某个祖先元素
        root: null,
        // 距离祖先元素的 margin
        rootMargin: '0px',
        // 可见的阀值
        threshold: ((_a = options === null || options === void 0 ? void 0 : options.intersectionObserver) === null || _a === void 0 ? void 0 : _a.thresholds) || defaulThresholds
    };
    var observeMap = new Map();
    if (process.env.TARO_ENV === 'h5') {
        // 1、方案1：使用scroll事件
        var scrollHandler_1 = (0, useThrottle_1.default)(function () {
            var threshold = observerOptions.threshold[1];
            observeMap.forEach(function (callback, selector) {
                var query = taro_1.default.createSelectorQuery();
                if (!query)
                    return;
                var clientHeight = document.documentElement.clientHeight;
                var clientWidth = document.documentElement.clientWidth;
                query
                    .select(selector)
                    .boundingClientRect()
                    .exec(function (res) {
                    var boundingClientRect = res[0] || {};
                    // 显示超过一半算曝光
                    var top = boundingClientRect.top, bottom = boundingClientRect.bottom, left = boundingClientRect.left, right = boundingClientRect.right, width = boundingClientRect.width, height = boundingClientRect.height;
                    var size = width * height;
                    var intersectHeight = Math.min(clientHeight, bottom) - Math.max(0, top);
                    var intersectWidth = Math.min(clientWidth, right) - Math.max(0, left);
                    if (!intersectHeight ||
                        intersectHeight < 0 ||
                        !intersectWidth ||
                        intersectWidth < 0)
                        return;
                    var intersectSize = intersectHeight * intersectWidth;
                    var intersectionRatio = intersectSize / size;
                    if (!intersectionRatio || intersectionRatio < threshold)
                        return;
                    callback({
                        intersectionRatio: intersectionRatio,
                        boundingClientRect: boundingClientRect
                    });
                });
            });
        }, 100);
        window.addEventListener('scroll', scrollHandler_1);
        // 2、方案2：使用IntersectionObserver对象
        if (!isIntersectionObserverReport) {
            isIntersectionObserverReport = true;
            // wq.webmonitor.mjcx.jxpp_content.index.action.intersectionObserver
        }
        if (!window.IntersectionObserver)
            return null;
        var observeMap2_1 = new Map();
        var observerInstance_1 = new IntersectionObserver(function (entries) {
            var threshold = observerOptions.threshold[1];
            entries.forEach(function (entry) {
                // intersectionRatio>=1时  需要元素完全露出  不能被圆角hidden
                if (entry.intersectionRatio < threshold)
                    return;
                var node = entry.target;
                if (node.classList && node.classList.length) {
                    node.classList.forEach(function (className) {
                        var _a;
                        if (className && observeMap2_1.has(".".concat(className))) {
                            (_a = observeMap2_1.get(".".concat(className))) === null || _a === void 0 ? void 0 : _a(entry);
                        }
                    });
                }
            });
        }, observerOptions);
        return {
            observe: function (targetSelector, callback, callback2) {
                var ele = document.querySelector(targetSelector);
                if (!ele)
                    return;
                observeMap.set(targetSelector, callback);
                setTimeout(function () { return scrollHandler_1(); });
                if (!callback2)
                    return;
                observeMap2_1.set(targetSelector, callback2);
                observerInstance_1.observe(ele, function () { });
            },
            disconnect: function () {
                observerInstance_1.disconnect();
                window.removeEventListener('scroll', scrollHandler_1);
            },
            relativeTo: function () {
                return observerInstance_1;
            },
            relativeToViewport: function () {
                return observerInstance_1;
            }
        };
    }
    var getNewObserver = function () {
        var currentPage = taro_1.default.getCurrentInstance().page;
        if (currentPage) {
            var newObserver = taro_1.default.createIntersectionObserver(currentPage, (options === null || options === void 0 ? void 0 : options.intersectionObserver) || {
                thresholds: [defaulThresholds[1]]
            }).relativeToViewport(options === null || options === void 0 ? void 0 : options.relativeToViewport);
            return newObserver;
        }
        return null;
    };
    var observer = getNewObserver();
    var observerList = [observer];
    return {
        observe: function (targetSelector, callback) {
            var oldObserver = observer;
            observer = getNewObserver();
            if (!observer)
                return observer;
            observerList.push(observer);
            return oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.observe(targetSelector, callback);
        },
        disconnect: function () {
            observerList.forEach(function (_observer) {
                _observer === null || _observer === void 0 ? void 0 : _observer.disconnect();
            });
        },
        relativeTo: function (selector, margins) {
            if (!observer)
                return observer;
            return observer.relativeTo(selector, margins);
        },
        relativeToViewport: function (margins) {
            if (!observer)
                return observer;
            return observer.relativeToViewport(margins);
        }
    };
}
/**
 *
 * @manager 陈隆德(chenlongde)
 *
 * 获取1个IntersectionObserver引用对象
 *
 * @example 基础用法
 * ```ts
 * import Taro from '@tarojs/taro';
 * import { useRef, useEffect } from 'react';
 * import useIntersectionObserver from "@jhooks/useIntersectionObserver";
 * import { IContentCard } from '../models';
 *
 * export function useObserveContentList(options?: {
 *     contentList: IContentCard[];
 *     observeClassName: string;
 *     observedCallback: (item: IContentCard) => void;
 *     intersectionObserver?: Taro.createIntersectionObserver.Option;
 *     relativeToViewport?: Taro.IntersectionObserver.RelativeToViewportMargins;
 * }): void {
 *     const { contentList, observeClassName = '', observedCallback } = options || {};
 *     const observer = useIntersectionObserver(options);
 *     const hasReportedMap = useRef(new Map<string, boolean>());
 *     useEffect(() => {
 *         if (!observeClassName) return;
 *         if (!contentList || !contentList.length) return;
 *         const observerCurrent = observer.current;
 *         if (!observerCurrent) return;
 *         Taro.nextTick(() => {
 *             contentList.forEach((item) => {
 *                 const observeKey = `.${observeClassName}${item.contentId}`;
 *                 observerCurrent.observe(
 *                     observeKey,
 *                     () => {
 *                         if (hasReportedMap.current.has(observeKey)) return;
 *                         hasReportedMap.current.set(observeKey, true);
 *                         observedCallback?.(item);
 *                     }
 *                 );
 *             });
 *         });
 *         return () => {
 *             observerCurrent?.disconnect();
 *         };
 *         // eslint-disable-next-line react-hooks/exhaustive-deps
 *     }, [contentList, observeClassName]);
 * }
 *
 * // 在函数组件中，监听contentList中元素暴露在容器中，触发observedCallback并上报
 *     useObserveContentList({
 *         contentList,
 *         observeClassName: `index_topic_item_${topicId}_`,
 *         observedCallback: (item: IContentCard) => {
 *             if (!hasExposure.current) {
 *                 hasExposure.current = true;
 *                 // 话题楼层做了曝光的上报，理论上PV应该和页面渲染成功一致
 *                 // wq.webmonitor.mjcx.jxpp_content.index.action.exposureTopicContentScroll
 *                 bizReport(INDEX_BIZ_ID, 6, 14, `index_topic_item_${topicId}_${item.contentId}`);
 *             }
 *             exposureReport(CONTENT_INDEX_PTAG.TOPIC_CONTENT, {
 *                 tab_id: topicId || 999,
 *                 tab_pos: currentTopicIndex + 1,
 *                 prv: JSON.stringify([{ content_id: item.contentId }]),
 *             });
 *         }
 *     });
 *
 * ```
 * @param options 配置项
 * @returns {(MutableRefObject<Taro.IntersectionObserver | null>)} IntersectionObserver引用对象
 */
function useIntersectionObserver(options) {
    var observer = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        observer.current = getIntersectionObserver(options);
        return function () {
            var _a;
            (_a = observer.current) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
    }, []);
    return observer;
}
exports.default = useIntersectionObserver;
//# sourceMappingURL=index.js.map