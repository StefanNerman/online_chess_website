import React from 'react'



type params = {
    image: string,
    selected: boolean
} & React.ComponentProps<'div'>

const PfpSelectorBox = ({image, selected, ...rest}: params) => {
    return (  
        <div className={selected ? 'pfp-selecor-image-box pfp-selector-selected' : 'pfp-selecor-image-box'} {...rest}>
            <div>
                
            </div>
        </div>
    )
}
 
export default PfpSelectorBox;