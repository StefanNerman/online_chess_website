import React from 'react'




type params = {
    rank: number
} & React.ComponentProps<'div'>

const StatsTop = ({rank, ...rest}: params) => {
    return (  
        <div className='proflie-stats-top stats-panel-frame' {...rest}>
            <div>
                <div className='image-small-div'></div>
                <h3>1243</h3>
            </div>
        </div>
    )
}
 
export default StatsTop;