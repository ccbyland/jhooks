import { renderHook, act } from '@testing-library/react-hooks';
import { useState, useRef, useCallback } from 'react';
import useLockFn from '../index';

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

describe('useLockFn', () => {

  it('should be defined', () => {
    expect(useLockFn).toBeDefined();
  });

  const setUp = (): any =>
    renderHook(() => {
      const [tag, updateTag] = useState(false);
      const countRef = useRef(0);
      const persistFn = useCallback(
        async (step: number) => {
          countRef.current += step;
          await sleep(50);
        },
        [tag],
      );
      const locked = useLockFn(persistFn);

      return {
        locked,
        countRef,
        updateTag: () => updateTag(true),
      };
    });

    it('should work', async () => {
      const hook = setUp();
      const { locked, countRef } = hook.result.current;
      locked(1);
      expect(countRef.current).toBe(1);
      locked(2);
      expect(countRef.current).toBe(1);
      await sleep(30);
      locked(3);
      expect(countRef.current).toBe(1);
      await sleep(30);
      locked(4);
      expect(countRef.current).toBe(5);
      locked(5);
      expect(countRef.current).toBe(5);
      await sleep(60);
      locked(5);
      expect(countRef.current).toBe(10);
    });

    it('should same', () => {
      const hook = setUp();
      const preLocked = hook.result.current.locked;
      hook.rerender();
      expect(hook.result.current.locked).toEqual(preLocked);
      act(hook.result.current.updateTag);
      expect(hook.result.current.locked).not.toEqual(preLocked);
    });

});
