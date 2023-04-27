import React from 'react'
import Checkbox1 from './checkbox_1';


type params = {
    text: string
    linkOnClick: Function | null
    onCheck: Function | null
    onUnCheck: Function | null
    checked: boolean
} & React.ComponentProps<'div'>

const CheckboxText = ({text, linkOnClick, onCheck, onUnCheck, checked, ...rest}: params) => {


    function thisOnCheck(){
        onCheck && onCheck()
    }
    function thisOnUnCheck(){
        onUnCheck && onUnCheck()
    }

    return (  
        <div className='checkbox-text-1' {...rest}>
            <Checkbox1 onCheck={thisOnCheck} onUnCheck={thisOnUnCheck} checked={checked}/>
            <a tabIndex={0} onClick={() => {
                linkOnClick && linkOnClick()
                return
            }}>{text}</a>
        </div>
    );
}
 
export default CheckboxText;