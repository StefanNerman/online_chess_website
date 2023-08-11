import React from 'react'



type params = {
    text: string,
} & React.ComponentProps<'button'>

const RoundEdgeButton = ({text, ...rest}: params) => {
    return (  
        <button className='round-edge-button' {...rest}>
            {text}
        </button>
    )
}
 
export default RoundEdgeButton;