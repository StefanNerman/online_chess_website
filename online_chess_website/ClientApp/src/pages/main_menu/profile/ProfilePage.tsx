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
                {/*
                possible settings:
                change name 
                change pfp
                delete profile

                other: 
                statistics
                rank
                */}

                <div className='profile-bottom-stats'>
                    <h4>Player statistics</h4>
                    <div className='proflie-stats-top stats-panel-frame'>
                        <div>
                            <div className='image-small-div'></div>
                            <h3>1243</h3>
                        </div>
                    </div>
                    <div className='proflie-stats-bottom stats-panel-frame'>
                        <div>

                        </div>
                    </div>
                </div>
                <div className='dotted-line'>
                    
                </div>
                <div className='profile-bottom-settings'>
                    <h4>Profile settings</h4>
                    <div className='profile-change-name-box'>
                        {/*no need for "change username" button here when change registered save and cancel buttons will show up*/}
                        <label>Change name</label>
                        <input type='text' placeholder='loong_name_12'></input>
                    </div>
                </div>

                {/*make it so these buttons only show if you make a change to your profile*/}

                {
                false &&
                <div id='page-exit-options-container'>
                    <RoundEdgeButton text='Save' onClick={() => {/*save the changes to database*/}}/>
                    <RoundEdgeButton text='Cancel' onClick={() => {/*navigate to menu or reload profile page*/}}/>
                </div>
                }
            </div>
        </div>
    );
}
 
export default ProfilePage;