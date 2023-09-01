import React from 'react'



type params = {
    image: string,
    selected: boolean
} & React.ComponentProps<'div'>

const PfpSelectorBox = ({image, selected, ...rest}: params) => {

    let classString = selected ? 'pfp-selector-image-box pfp-selector-selected ' : 'pfp-selector-image-box '

    return (  

        <div className={classString} {...rest}>
            <div className={'profile-image-60px-' + image}>
    
            </div>
        </div>
    )
}
 
export default PfpSelectorBox;