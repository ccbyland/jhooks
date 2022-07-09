import { renderHook, act } from '@testing-library/react-hooks';
import useOnUpdate from '../index';

describe('useOnUpdate', () => {
    const callback = jest.fn();
    const setUp = () => renderHook(() => useOnUpdate(callback));
    it('should be defined', () => {
        expect(useOnUpdate).toBeDefined();
    });
    it('验证回调函数初次渲染时，不被调用，重新渲染时，才调用', () => {
        const hook = setUp();
        expect(callback).not.toBeCalled();
        hook.rerender();
        // 确保被调用了1次
        expect(callback).toHaveBeenCalledTimes(1);
        hook.rerender();
        // 确保被调用了2次
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
