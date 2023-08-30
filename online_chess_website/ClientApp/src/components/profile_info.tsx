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
            <div className={'profile-img-40 ' + params.image}></div>
            <div className='profileinfo-text'>
                <h6>{params.username}</h6>
                <p>{params.info}</p>
            </div>
        </div>
    );
}
 
export default ProfileInfo;