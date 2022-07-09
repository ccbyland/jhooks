import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import useUnmount from '../index';

describe('useUnmount', () => {

  it('should be defined', () => {
    expect(useUnmount).toBeDefined();
  });

  it('useUnmount should work', async () => {
    const fn = jest.fn();
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });

});
