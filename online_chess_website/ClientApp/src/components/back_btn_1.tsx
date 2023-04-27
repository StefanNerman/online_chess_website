import React from 'react'
import './components.css'


type params = {
    
} & React.ComponentProps<'button'>

const BackButton1 = ({...rest}: params) => {


    return (
        <button className='back-btn-1' {...rest}>
        </button>
    );
}

export default BackButton1
