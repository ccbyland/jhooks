import { renderHook, act } from '@testing-library/react-hooks';
import { useState, useRef } from 'react';
import useSetState from '../index';

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

const setUp = ({ x, fn }) => renderHook((props) => {
  const [state, setState] = useSetState({
    x: props.x
  })

  const set = (y, fn) => {
    setState({
      x: y,
    }, fn)
  };

  return {
    state, set
  }
}, {
  initialProps: {
    x,
    fn
  }
});


describe('useSetState', () => {
  it('should be defined', () => {
    expect(useSetState).toBeDefined();
  });
  it('验证state变化后，执行回调，参数是否一致', () => {

    const { result, rerender} = setUp({
      x:1,
      fn: () => {}
    })
    expect(result.current.state.x).toBe(1)

    act(() => {
      result.current.set(2, (currentState) => {
        expect(currentState.x).toBe(2)
      })
    })
  });

  // it('验证setState参数为函数时，代码正常运作',  () => {

  //   const { result, rerender} = setUp({
  //     x: 1,
  //     fn: () => {}
  //   })

  //   act(() => {
  //     expect(result.current.state.x).toBe(1)
  //     result.current.set((prevState) => {
  //       expect(prevState.x).toBe(1)
  //       return 2
  //     }, (currentState) => {
  //       expect(currentState.x).toBe(2)
  //     })
  //   });
  // });

});
