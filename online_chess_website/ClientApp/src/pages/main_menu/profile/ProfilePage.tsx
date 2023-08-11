import React from 'react'
import ProfilePicture from './ProfilePicture'


const ProfilePage = () => {
    return (  
        <div id='profile-frame'>
            <div className='profile-top-frame'>
                <ProfilePicture />
                <div className='profile-top-name-container'>

                </div>
            </div>
            <div className='profile-bottom-frame'>
                

                <div id='page-exit-options-container'>
                    {/*make new component for both buttons*/}
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;