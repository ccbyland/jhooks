import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import useAsyncEffect from '../index';

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

describe('useAsyncEffect', () => {
    it('should be defined', () => {
        expect(useAsyncEffect).toBeDefined();
    });

    it('验证第1个入参，验证支持async函数', async () => {
        const hook = renderHook(() => {
            const [x, setX] = useState(false);
            useAsyncEffect(async () => {
                await sleep(100);
                setX(true);
            }, []);
            return x;
        });
        expect(hook.result.current).toBe(false);
        await act(async () => {
            await sleep(150);
        });
        expect(hook.result.current).toBe(true);
    });

    it('验证第2个入参，函数执行的依赖项', async () => {
        const hook = renderHook(() => {
            const [x, setX] = useState(1);
            const [y, setY] = useState(0);

            useAsyncEffect(async () => {
                await sleep(1000);
                setY(x);
            }, [x]);

            return {
                y,
                setX
            };
        });
        expect(hook.result.current.y).toBe(0);

        await act(async () => {
            await sleep(500);
            hook.result.current.setX(2);
        });
        expect(hook.result.current.y).toBe(0);

        await act(async () => {
            await sleep(200);
        });
        expect(hook.result.current.y).toBe(0);

        await act(async () => {
            await sleep(500);
            hook.result.current.setX(3);
        });
        expect(hook.result.current.y).toBe(1);

        await act(async () => {
            await sleep(800);
        });
        expect(hook.result.current.y).toBe(2);

        await act(async () => {
            await sleep(500);
        });
        expect(hook.result.current.y).toBe(3);
    });
});
