import { renderHook, act } from '@testing-library/react-hooks';
import useRefState from '../index';

describe('useRefState', () => {
    const setUp = initialValue =>
        renderHook(() => {
            const [state, setState, stateRef] = useRefState(initialValue);
            return {
                state,
                setState,
                stateRef
            };
        });
    it('should be defined', () => {
        expect(useRefState).toBeDefined();
    });
    it('验证state为函数时，ref取到最新值', () => {
        const { result, rerender } = setUp(() => 'helloworld');
        expect(result.current.state).toEqual('helloworld');

        act(() => {
            result.current.setState(() => 'changeHelloworld');
            expect(result.current.state).toBe('helloworld');
        });
        expect(result.current.stateRef.current).toEqual('changeHelloworld');
    });

    it('验证state为非函数时，ref取到最新值', () => {
        const { result, rerender } = setUp({
            x: 0
        });
        expect(result.current.state.x).toEqual(0);

        act(() => {
            result.current.setState({
                x: 1,
                y: 2
            });
            expect(result.current.state.y).toBe(undefined);
        });
        expect(result.current.stateRef.current.x).toEqual(1);
        expect(result.current.stateRef.current.y).toEqual(2);
    });
});
