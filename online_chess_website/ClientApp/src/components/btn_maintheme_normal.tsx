import React from 'react'
import './components.css'


type params = {
    text: string,
} & React.ComponentProps<'button'>

const MainthemeButton = ({text, ...rest}: params) => {


    return (
        <button className='btn-maintheme' {...rest}>
            {text}
        </button>
    )
}

export default MainthemeButton