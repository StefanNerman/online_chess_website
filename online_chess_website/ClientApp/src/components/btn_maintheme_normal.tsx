import React from 'react'
import './components.css'


interface buttonParamsObject {
    text: string,
    callback: Function
    mousein: Function
    mouseout: Function
}

//<ButtonMainthemeBig text='press epic button' 
//callback={() => callbackFunction(params, params, params)}/>

const MainthemeButton = (params: buttonParamsObject) => {

    const buttonText = params.text
    const callback: Function = params.callback

    return (
        <button className='btn-maintheme' 
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => callback()}
        onMouseEnter={() => params.mousein()} onMouseLeave={() => params.mouseout()}>
            {buttonText}
        </button>
    )
}

export default MainthemeButton