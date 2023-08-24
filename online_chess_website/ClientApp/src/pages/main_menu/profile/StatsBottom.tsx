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

            </ul>
        </div>
    )
}
 
export default StatsBottom;