import React from 'react'



type params = {
    image: string,
} & React.ComponentProps<'div'>

const PfpSelectorBox = ({image, ...rest}: params) => {
    return (  
        <div className='pfp-selecor-image-box' {...rest}>
            <div>
                
            </div>
        </div>
    )
}
 
export default PfpSelectorBox;