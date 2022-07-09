import { useRef, useEffect, MutableRefObject } from 'react';
import Taro from '@tarojs/taro';
import useThrottle from '@jhooks/useThrottle';

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
let isIntersectionObserverReport = false;
function getIntersectionObserver(options?: {
  intersectionObserver?: Taro.createIntersectionObserver.Option;
  relativeToViewport?: Taro.IntersectionObserver.RelativeToViewportMargins;
}): Taro.IntersectionObserver | null {
  // 默认的元素可见阈值
  const defaulThresholds = [0, 0.75, 1];
  const observerOptions = {
    // null 为相对于视窗，也可为具体要监测的某个祖先元素
    root: null,
    // 距离祖先元素的 margin
    rootMargin: '0px',
    // 可见的阀值
    threshold: options?.intersectionObserver?.thresholds || defaulThresholds
  };
  const observeMap = new Map<
    string,
    Taro.IntersectionObserver.ObserveCallback
  >();

  if (process.env.TARO_ENV === 'h5') {
    // 1、方案1：使用scroll事件
    const scrollHandler = useThrottle(() => {
      const threshold = observerOptions.threshold[1];
      observeMap.forEach((callback, selector) => {
        const query = Taro.createSelectorQuery();
        if (!query) return;
        const clientHeight = document.documentElement.clientHeight;
        const clientWidth = document.documentElement.clientWidth;
        query
          .select(selector)
          .boundingClientRect()
          .exec(res => {
            const boundingClientRect: Taro.NodesRef.BoundingClientRectCallbackResult =
              res[0] || {};
            // 显示超过一半算曝光
            const { top, bottom, left, right, width, height } =
              boundingClientRect;
            const size = width * height;
            const intersectHeight =
              Math.min(clientHeight, bottom) - Math.max(0, top);
            const intersectWidth =
              Math.min(clientWidth, right) - Math.max(0, left);
            if (
              !intersectHeight ||
              intersectHeight < 0 ||
              !intersectWidth ||
              intersectWidth < 0
            )
              return;
            const intersectSize = intersectHeight * intersectWidth;
            const intersectionRatio = intersectSize / size;
            if (!intersectionRatio || intersectionRatio < threshold) return;
            callback({
              intersectionRatio,
              boundingClientRect
            } as unknown as Taro.IntersectionObserver.ObserveCallbackResult);
          });
      });
    }, 100);
    window.addEventListener('scroll', scrollHandler as EventListenerOrEventListenerObject);

    // 2、方案2：使用IntersectionObserver对象
    if (!isIntersectionObserverReport) {
      isIntersectionObserverReport = true;
      // wq.webmonitor.mjcx.jxpp_content.index.action.intersectionObserver
    }
    if (!window.IntersectionObserver) return null;
    const observeMap2 = new Map<
      string,
      Taro.IntersectionObserver.ObserveCallback
    >();
    const observerInstance: Taro.IntersectionObserver =
      new IntersectionObserver(entries => {
        const threshold = observerOptions.threshold[1];
        entries.forEach(entry => {
          // intersectionRatio>=1时  需要元素完全露出  不能被圆角hidden
          if (entry.intersectionRatio < threshold) return;
          const node = entry.target as HTMLElement;
          if (node.classList && node.classList.length) {
            node.classList.forEach(className => {
              if (className && observeMap2.has(`.${className}`)) {
                observeMap2.get(`.${className}`)?.(entry as any);
              }
            });
          }
        });
      }, observerOptions) as any;
    return {
      observe: (
        targetSelector: string,
        callback: Taro.IntersectionObserver.ObserveCallback,
        callback2?: Taro.IntersectionObserver.ObserveCallback
      ) => {
        const ele = document.querySelector(targetSelector);
        if (!ele) return;
        observeMap.set(targetSelector, callback);
        setTimeout(() => scrollHandler());
        if (!callback2) return;
        observeMap2.set(targetSelector, callback2);
        observerInstance.observe(ele as any, () => {});
      },
      disconnect: () => {
        observerInstance.disconnect();
        window.removeEventListener('scroll', scrollHandler as EventListenerOrEventListenerObject);
      },
      relativeTo: () => {
        return observerInstance;
      },
      relativeToViewport: () => {
        return observerInstance;
      }
    };
  }
  const getNewObserver = (): Taro.IntersectionObserver | null => {
    const currentPage: Taro.PageInstance | null =
      Taro.getCurrentInstance().page;
    if (currentPage) {
      const newObserver = Taro.createIntersectionObserver(
        currentPage,
        options?.intersectionObserver || {
          thresholds: [defaulThresholds[1]]
        }
      ).relativeToViewport(options?.relativeToViewport);
      return newObserver;
    }
    return null;
  };
  let observer = getNewObserver();
  const observerList = [observer];
  return {
    observe: (
      targetSelector: string,
      callback: Taro.IntersectionObserver.ObserveCallback
    ) => {
      const oldObserver = observer;
      observer = getNewObserver();
      if (!observer) return observer;
      observerList.push(observer);
      return oldObserver?.observe(targetSelector, callback);
    },
    disconnect: () => {
      observerList.forEach(_observer => {
        _observer?.disconnect();
      });
    },
    relativeTo: (
      selector: string,
      margins?: Taro.IntersectionObserver.RelativeToMargins | undefined
    ): Taro.IntersectionObserver => {
      if (!observer) return observer as unknown as Taro.IntersectionObserver;
      return observer.relativeTo(selector, margins);
    },
    relativeToViewport: (
      margins?: Taro.IntersectionObserver.RelativeToViewportMargins | undefined
    ): Taro.IntersectionObserver => {
      if (!observer) return observer as unknown as Taro.IntersectionObserver;
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
export default function useIntersectionObserver(options?: {
  /**
   * intersectionObserver 创建配置， 参考[Taro文档](https://taro-docs.jd.com/taro/docs/apis/wxml/createIntersectionObserver)、[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createIntersectionObserver.html)
   *
   * @type {Taro.createIntersectionObserver.Option}
   */
  intersectionObserver?: Taro.createIntersectionObserver.Option;
  /**
   * intersectionObserver 相对容器元素边距配置， 参考[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/IntersectionObserver.relativeToViewport.html)
   *
   * @type {Taro.IntersectionObserver.RelativeToViewportMargins}
   */
  relativeToViewport?: Taro.IntersectionObserver.RelativeToViewportMargins;
}): MutableRefObject<Taro.IntersectionObserver | null> {
  const observer = useRef<Taro.IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = getIntersectionObserver(options);
    return () => {
      observer.current?.disconnect();
    };
  }, []);
  return observer;
}


