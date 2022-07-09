
import { renderHook } from '@testing-library/react-hooks';
import useEventCallback from '../index';

test('useEventCb', () => {
    let temp;
    function exe(){
        const newFunc = renderHook(()=>useEventCallback(()=>{
            const a = 123;
          }))
          if(!temp){
            temp = newFunc;
          }else if(temp===newFunc){
            expect(true)
          }else{
            expect(false)
          }
    }
    exe();
    exe();
    exe();
  })