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
            <div className={'playerinfobox-image profile-image-40px-' + props.picture}></div>
            <div className='playerinfobox-info'>
                <h4>{props.username}</h4>
                <p>{props.rank}</p>
            </div>
        </div>
    );
}
 
export default PlayerInfoPanel;