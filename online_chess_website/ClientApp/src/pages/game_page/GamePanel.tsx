import React from 'react'
import ChessComponent, {setIsLocalGame} from './chess_game/ChessComponent'
import FramedTextbox from '../../components/framed_textbox';

interface props {
    gamemode: string
    color: string
}

const GamePanel = ({gamemode, color}: props) => {

    setIsLocalGame(true)

    //on online game:
    //1 http request made to establish a websocket
    //2 function runs when server sends move information
    //3 make move on client

    return (  
        <div>
            <div className='gamepanel-top-section'>
                <FramedTextbox text={'A1 -> A1'} id='gamepanel-movetab-left'/>
                <FramedTextbox text={'00:00'} id='gamepanel-timetab'/>
                <FramedTextbox text={'H8 -> H8'} id='gamepanel-movetab-right'/>
            </div>
            <div className='gamepanel-middle-section'>
                <ChessComponent gamemode={gamemode} color={color}/>
            </div>
            <div className='gamepanel-bottom-section'>
                
            </div>
        </div>
    );
}
 
export default GamePanel;