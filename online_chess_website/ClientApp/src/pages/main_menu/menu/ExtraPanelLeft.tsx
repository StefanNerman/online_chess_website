import React from 'react'

type params = {
    rank: number | string
    total: number | string
    wins: number | string
    losses: number | string
    draws: number | string
} & React.ComponentProps<'div'>

const ExtraPanelLeft = ({rank, total, wins, losses, draws, ...rest}: params) => {

    return (  
        <div className='extrapanel-frame' {...rest}>
            <div className='extrapanel-screen statistics-panel'>
                <h3>Statistics</h3>
                <ul>
                    <li className='fading-underline-brown'>Rank: {rank}</li>
                    <li className='fading-underline-brown'>Games played: {total}</li>
                    <li className='fading-underline-brown'>Wins: {wins}</li>
                    <li className='fading-underline-brown'>Losses: {losses}</li>
                    <li className='fading-underline-brown'>Draws: {draws}</li>
                </ul>
            </div>
        </div>
    );
}
 
export default ExtraPanelLeft;