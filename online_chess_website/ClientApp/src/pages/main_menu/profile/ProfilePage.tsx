import React from 'react'
import ProfilePicture from './ProfilePicture'
import RoundEdgeButton from '../../../components/round_edge_button'


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
                    <RoundEdgeButton text='Save' onClick={() => {}}/>
                    <RoundEdgeButton text='Cancel' onClick={() => {}}/>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;