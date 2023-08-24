import React from 'react'



type params = {
    games: number,
    wins: number,
    losses: number,
    draws: number
} & React.ComponentProps<'div'>

const StatsBottom = ({games, wins, losses, draws, ...rest}: params) => {
    return (  
        <div className='proflie-stats-bottom stats-panel-frame' {...rest}>
            <ul>
                <div className='lightbrown-bg'>
                    <p className='stats-row-front'>Games total:</p>
                    <p className='stats-row-back'>{games}</p>
                </div>
                <div>
                    <p className='stats-row-front'>Wins:</p>
                    <p className='stats-row-back'>{wins}</p>
                </div>
                <div className='lightbrown-bg'>
                    <p className='stats-row-front'>Losses</p>
                    <p className='stats-row-back'>{losses}</p>
                </div>
                <div>
                    <p className='stats-row-front'>Draws:</p>
                    <p className='stats-row-back'>{draws}</p>
                </div>
            </ul>
        </div>
    )
}
 
export default StatsBottom;