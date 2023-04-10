import React from 'react'
import './components.css'

interface params {
    image: string
    username: string
    info: string
}

const ProfileInfo = (params: params) => {


    return (  
        <div className='profileinfo-frame'>
            <div className='profile-img-40' style={{backgroundImage: `url(${params.image || 'https://th.bing.com/th/id/R.b26750f8c7585adbe51c4757675300e1?rik=5fgOHHL8kCPmXA&riu=http%3a%2f%2f4vector.com%2fi%2ffree-vector-chess-white-pawn-piece-clip-art_105063_Chess_White_Pawn_Piece_clip_art_small.png&ehk=rDM8YzeCTOhqc9EvYkPol63fl3V%2fu2d5Yx%2fB8die8WA%3d&risl=&pid=ImgRaw&r=0'})`}}></div>
            <div className='profileinfo-text'>
                <h6>{params.username}</h6>
                <p>{params.info}</p>
            </div>
        </div>
    );
}
 
export default ProfileInfo;