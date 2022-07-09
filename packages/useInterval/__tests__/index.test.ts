import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay?: number;
  options?: { immediate: boolean };
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options));

describe('useInterval', () => {

  // 允许使用 伪造计时器函数
  jest.useFakeTimers();

  it('should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  it('check options delay', () => {

    // 创建一个基础的mock函数
    const callback = jest.fn();

    // 执行
    setUp({ fn: callback, delay: 20 });

    // 断言callback没有立即被调用
    expect(callback).not.toBeCalled();

    // 快进70毫秒
    jest.advanceTimersByTime(70);

    // 确保被调用了3次
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('check options delay is undefined', () => {

    // 创建一个基础的mock函数
    const callback = jest.fn();

    // 执行
    setUp({ fn: callback });

    // 断言callback没有被调用
    expect(callback).not.toBeCalled();

    // 快进100毫秒
    jest.advanceTimersByTime(100);

    // 断言callback没有被调用
    expect(callback).not.toBeCalled();
  });

  it('check options immediate is undefined', () => {

    // 创建一个基础的mock函数
    const callback = jest.fn();

    // 执行
    setUp({ fn: callback, delay: 20, options: { immediate: true } });

    // 断言callback被调用
    expect(callback).toBeCalled();

    // 确保被调用了1次
    expect(callback).toHaveBeenCalledTimes(1);

    // 快进50毫秒
    jest.advanceTimersByTime(50);

    // 确保被调用了1次
    expect(callback).toHaveBeenCalledTimes(3);
  });

});