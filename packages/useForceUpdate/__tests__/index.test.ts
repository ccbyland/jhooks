import { renderHook, act } from '@testing-library/react-hooks';
import useForceUpdate from '../index';
import useMemoizedFn from '../../useMemoizedFn';

describe('useForceUpdate', () => {

  it('should be defined', () => {
    expect(useForceUpdate).toBeDefined();
  });

  it('验证强制更新', async () => {
    let count = 0;
    const hooks = renderHook(() => {
      const update = useForceUpdate();
      return {
        update,
        count,
        onChange: useMemoizedFn(() => {
          count++;
          update();
        }),
      };
    });
    expect(hooks.result.current.count).toEqual(0);
    act(hooks.result.current.onChange);
    expect(hooks.result.current.count).toEqual(1);
  });

  it('验证重新渲染返回同一个强制更新函数', () => {
    const hooks = renderHook(() => useForceUpdate());
    const preUpdate = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(preUpdate);
  });
});
