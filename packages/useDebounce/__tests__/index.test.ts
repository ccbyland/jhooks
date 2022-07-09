import {
    act,
    renderHook,
    RenderHookResult
} from '@testing-library/react-hooks';
import useDebounce from '../index';

interface ParamsObj {
    fn: (...arg: any) => any;
    wait?: number;
}

const setUp = ({ fn, wait }: ParamsObj) =>
    renderHook(() => useDebounce(fn, { wait }));

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useDebounce>>;

describe('useDebounceFn', () => {
    // 允许使用 伪造计时器函数
    jest.useFakeTimers();

    it('should be defined', () => {
        expect(useDebounce).toBeDefined();
    });

    it('check base', async () => {
        // 创建一个基础的mock函数
        const callback = jest.fn();

        // 提供act 使测试运行更接近 React 在浏览器中的工作方式
        act(() => {
            hook = setUp({
                fn: callback,
                wait: 2000
            });
        });

        // 执行
        hook.result.current();

        // 断言callback没有被调用
        expect(callback).not.toBeCalled();

        // 快进3000毫秒
        jest.advanceTimersByTime(3000);

        // 执行3次
        hook.result.current();
        hook.result.current();
        hook.result.current();

        // 确保被调用了1次
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('check options wait', async () => {
        // 创建一个基础的mock函数
        const callback = jest.fn();

        // 提供act 使测试运行更接近 React 在浏览器中的工作方式
        act(() => {
            hook = setUp({
                fn: callback
            });
        });

        // 执行
        hook.result.current();

        // 断言callback没有被调用
        expect(callback).not.toBeCalled();

        // 快进3000毫秒
        jest.advanceTimersByTime(3000);

        // 执行3次
        hook.result.current();
        hook.result.current();
        hook.result.current();

        // 确保被调用了1次
        expect(callback).toHaveBeenCalledTimes(1);

        // 快进1000毫秒
        jest.advanceTimersByTime(1000);

        // 执行
        hook.result.current();

        // 确保已被调用2次
        expect(callback).toHaveBeenCalledTimes(2);

        // 快进500毫秒
        jest.advanceTimersByTime(500);

        // 执行
        hook.result.current();

        // 确保已被调用2次
        expect(callback).toHaveBeenCalledTimes(3);
    });
});
