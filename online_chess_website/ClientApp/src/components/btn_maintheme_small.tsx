import React from 'react'
import './components.css'


interface buttonParamsObject {
    text: string,
    callback: Function
    mousein: Function
    mouseout: Function
}

const SmallMainthemeButton = (params: buttonParamsObject) => {

    const buttonText = params.text
    const callback: Function = params.callback

    return (
        <button className='btn-maintheme-small btn-maintheme' 
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => callback()}
        onMouseEnter={() => params.mousein()} onMouseLeave={() => params.mouseout()}>
            {buttonText}
        </button>
    )
}

export default SmallMainthemeButton