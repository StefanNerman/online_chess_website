import { url } from 'inspector'
import React from 'react'

interface props {
    username: string
    rank: number
    picture: string
}

const PlayerInfoPanel = (props: props) => {



    return (  
        <div className='playerinfobox-frame'>
            <img className='playerinfobox-image' src={props.picture}></img>
            <div className='playerinfobox-info'>
                <h4>{props.username}</h4>
                <p>{props.rank}</p>
            </div>
        </div>
    );
}
 
export default PlayerInfoPanel;