import React from 'react'
import ProfilePicture from './ProfilePicture'
import RoundEdgeButton from '../../../components/round_edge_button'


const ProfilePage = () => {
    return (  
        <div id='profile-frame'>
            <div className='profile-top-frame'>
                <ProfilePicture image='image1' id='profile-page-pfp'/>
                <div className='profile-top-name-container'>
                    loong_name_12
                </div>
            </div>
            <div className='profile-bottom-frame'>
                


                {/*make it so these buttons only show if you make a change to your profile*/}
                <div id='page-exit-options-container'>
                    <RoundEdgeButton text='Save' onClick={() => {/*save the changes to database*/}}/>
                    <RoundEdgeButton text='Cancel' onClick={() => {/*navigate to menu or reload profile page*/}}/>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;