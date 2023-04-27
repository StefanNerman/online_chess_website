import React from 'react'
import ChessComponent, {setIsLocalGame} from './chess_game/ChessComponent'
import FramedTextbox from '../../components/framed_textbox';

type props = {
    gamemode: string
} & React.ComponentProps<'div'>

const GamePanel = ({gamemode, ...rest}: props) => {

    setIsLocalGame(true)

    return (  
        <div {...rest}>
            <div className='gamepanel-top-section'>
                <FramedTextbox text={'H2 -> F3'} id='gamepanel-movetab-left'/>
                <FramedTextbox text={'11:48'} id='gamepanel-timetab'/>
                <FramedTextbox text={'H2 -> F3'} id='gamepanel-movetab-right'/>
            </div>
            <div className='gamepanel-middle-section'>
                <ChessComponent gamemode={gamemode}/>
            </div>
            <div className='gamepanel-bottom-section'>
                
            </div>
        </div>
    );
}
 
export default GamePanel;