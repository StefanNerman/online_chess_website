import React from 'react'
import './components.css'


type params = {
    text: string
} & React.ComponentProps<'button'>

const SmallMainthemeButton = ({text, ...rest}: params) => {



    return (
        <button className='btn-maintheme-small btn-maintheme' {...rest}>
            {text}
        </button>
    )
}

export default SmallMainthemeButton