import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useState } from 'react';
import useThrottle from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  deps?: any[];
  time: number;
}

const setUp = ({ fn, time }) => renderHook(() => useThrottle(fn, time));

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useThrottle>>;

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

describe('useThrottle', () => {

  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('run, cancel and flush should work', async () => {
    let count = 1;
    const throttleFn = (gap: number) => {
      count += gap;
    };
    act(() => {
      hook = setUp({
        fn: throttleFn,
        time: 500,
      });
    });
    await act(async () => {
      hook.result.current(1);
      expect(count).toBe(1);
      hook.result.current(1);
      hook.result.current(1);
      hook.result.current(1);
      expect(count).toBe(1);
      await sleep(450); // t: 450
      hook.result.current(2);
      expect(count).toBe(1);
      await sleep(100); // t: 550
      hook.result.current(2);
      expect(count).toBe(2);
      hook.result.current(3);
      hook.result.current(3);
      await sleep(500); // t: 1050
      expect(count).toBe(4);
      hook.result.current(1);
      hook.result.current(4);
      await sleep(500); // t: 1550
      expect(count).toBe(5);
      hook.result.current(1);
      hook.result.current(1);
      expect(count).toBe(5);
      await sleep(550); // t: 2100
      expect(count).toBe(6);
    });
  });
});
