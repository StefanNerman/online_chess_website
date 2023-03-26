import React from 'react'
import ButtonMTBig from '../../components/btn_maintheme_big'
import ExpandInfoBox from '../../components/expandinfobox_brown'

interface params {
    onButtonMouseIn: Function
    onButtonMouseOut: Function
    onButtonClick: Function
    buttonText: string
    description: string
}


const GameSelectionComponent = (params: params) => {
    return (  
        <div className='gameselection-container'>
            <ButtonMTBig text={params.buttonText} callback={() => params.onButtonClick()}
            mousein={() => params.onButtonMouseIn()} mouseout={() => params.onButtonMouseOut()}/>
            <div className='gameselection-description'>
                <ExpandInfoBox text={params.description}/>
            </div>
        </div>
    );
}
 
export default GameSelectionComponent;