import React from 'react'
import ChessComponent, {setIsLocalGame} from './chess_game/ChessComponent'
import FramedTextbox from '../../components/framed_textbox';



const GamePanel = () => {

    setIsLocalGame(true)

    return (  
        <div>
            <div className='gamepanel-top-section'>
                <FramedTextbox text={'H2 -> F3'} id='gamepanel-movetab-left'/>
                <FramedTextbox text={'11:48'} id='gamepanel-timetab'/>
                <FramedTextbox text={'H2 -> F3'} id='gamepanel-movetab-right'/>
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