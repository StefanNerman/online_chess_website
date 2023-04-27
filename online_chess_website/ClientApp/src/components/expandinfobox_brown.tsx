import React, { useState } from 'react'
import './components.css'


type params = {
    text: string
} & React.ComponentProps<'div'>

const ExpandInfoBox = ({text, ...rest}: params) => {

    const [ isExpanded, setIsExpanded ] = useState(false)

    function expandText(event: any){
        const textElement = event.target.parentElement.parentElement.children[1]
        const buttonElement = event.target.parentElement.children[1]
        if(isExpanded){
            setIsExpanded(false)
            textElement.style.animationName = 'shrink'
            textElement.classList.add('fully-removed')
            buttonElement.classList.remove('rotate-before-element-neg135')
        } else {
            setIsExpanded(true)
            textElement.classList.remove('fully-removed')
            buttonElement.classList.add('rotate-before-element-neg135')
        }
    }


    return ( 
        <div>
            <div className='expandinfobox-container' onClick={e => expandText(e)} {...rest}>
                <p>Info</p>
                <button></button>
            </div>
            <div className='expandinfobox-text fully-removed' role='textbox'>{text}</div>
        </div> 
    );
}


 
export default ExpandInfoBox;