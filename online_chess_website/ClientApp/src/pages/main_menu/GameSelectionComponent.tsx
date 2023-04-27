import React from 'react'
import ButtonMTBig from '../../components/btn_maintheme_big'
import ExpandInfoBox from '../../components/expandinfobox_brown'


type params = {
    onButtonClick: Function
    buttonText: string
    description: string
} & React.ComponentProps<'div'>


const GameSelectionComponent = ({onButtonClick, buttonText, description, ...rest}: params) => {
    return (  
        <div className='gameselection-container' {...rest}>
            <ButtonMTBig text={buttonText} onClick={() => onButtonClick()} />
            <div className='gameselection-description'>
                <ExpandInfoBox text={description}/>
            </div>
        </div>
    );
}
 
export default GameSelectionComponent;