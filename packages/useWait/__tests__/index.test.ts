import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import useWait from '../index';
import useAsyncEffect from '../../useAsyncEffect';

describe('useWait', () => {

  it('should be defined', () => {
    expect(useWait).toBeDefined();
  });

  it('useWait should work', async () => {
    const hook = renderHook(() => {
      const sleep = useWait();
      const [x, setX] = useState(false);
      useAsyncEffect(async () => {
        await sleep(100);
        setX(true);
      }, []);
      return {
        x,
        sleep
      };
    });
    expect(hook.result.current.x).toBe(false);
    await act(async () => {
      await hook.result.current.sleep(150);
    });
    expect(hook.result.current.x).toBe(true);
  });

});
