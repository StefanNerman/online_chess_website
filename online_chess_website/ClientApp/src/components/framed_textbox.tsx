import React from 'react'

type params = {
    text: string
} & React.ComponentProps<any>

const FramedTextbox = ({text, ...rest}: params) => {



    return (  
        <h4 className='framedtextbox' {...rest}>
            {text}
        </h4>
    );
}
 
export default FramedTextbox;