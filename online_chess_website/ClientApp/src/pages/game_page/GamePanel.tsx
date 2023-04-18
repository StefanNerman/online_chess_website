import React from 'react'
import ChessComponent from './ChessComponent'
import FramedTextbox from '../../components/framed_textbox';



const GamePanel = () => {
    return (  
        <div>
            <div className='gamepanel-top-section'>
                <FramedTextbox text={'E2 -> E4'} />
                <FramedTextbox text={'11:48'} />
                <FramedTextbox text={'H2 -> F3'} />
            </div>
            <div className='gamepanel-middle-section'>
                <ChessComponent />
            </div>
            <div className='gamepanel-bottom-section'>
                
            </div>
        </div>
    );
}
 
export default GamePanel;