import React from 'react'
import './components.css'


interface buttonParamsObject {
    callback: Function
    fromLeft: string
    fromTop: string
}

const BackButton1 = (params: buttonParamsObject) => {

    const callback = params.callback

    return (
        <button className='back-btn-1' style={{top: params.fromTop, left: params.fromLeft}}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => callback()}>
        </button>
    );
}

export default BackButton1
