import React from 'react'
import Checkbox1 from './checkbox_1';


interface params {
    text: string
    linkOnClick: Function | null
    onCheck: Function | null
    onUnCheck: Function | null
}

const CheckboxText = (params: params) => {


    function thisOnCheck(){
        params.onCheck && params.onCheck()
    }
    function thisOnUnCheck(){
        params.onUnCheck && params.onUnCheck()
    }

    return (  
        <div className='checkbox-text-1'>
            <Checkbox1 onCheck={thisOnCheck} onUnCheck={thisOnUnCheck}/>
            <a onClick={() => {
                params.linkOnClick && params.linkOnClick()
                return
            }}>{params.text}</a>
        </div>
    );
}
 
export default CheckboxText;