import React from 'react'
import './components.css'


type params = {
    text: string,
} & React.ComponentProps<'button'>

const BigMainthemeButton = ({text, ...rest}: params) => {



    return (
        <button className='btn-maintheme-big btn-maintheme' {...rest}>
            {text}
        </button>
    )
}

export default BigMainthemeButton