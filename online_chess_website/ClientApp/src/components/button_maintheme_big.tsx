import React from 'react'
import './components.css'

//basically make it so that you have to pass callback and callback params as params into this component
interface buttonParamsObject {
    buttonText: string,

}

const BigMainthemeButton = (params: buttonParamsObject) => {

    const buttonText = params.buttonText


    return (
        <button className='btn-maintheme-big btn-maintheme'>
            {buttonText}
        </button>
    )
}

export default BigMainthemeButton