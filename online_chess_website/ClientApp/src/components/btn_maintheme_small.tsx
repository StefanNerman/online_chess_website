import React from 'react'
import './components.css'


interface buttonParamsObject {
    text: string,
    callback: Function
}

//<ButtonMainthemeBig text='press epic button' 
//callback={() => callbackFunction(params, params, params)}/>

const SmallMainthemeButton = (params: buttonParamsObject) => {

    const buttonText = params.text
    const callback: Function = params.callback

    return (
        <button className='btn-maintheme-small btn-maintheme' 
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => callback()}>
            {buttonText}
        </button>
    )
}

export default SmallMainthemeButton