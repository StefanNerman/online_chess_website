import React, { useState } from 'react'
import ProfilePicture from './ProfilePicture'
import RoundEdgeButton from '../../../components/round_edge_button'
import { checkString } from '../../landing_page/LandingPage'


const ProfilePage = () => {

    const [changeMade, setChangeMade] = useState(false)
    const [invalidName, setInvalidName] = useState(false)

    function nameInputAction(e: any){
        //check if username taken (or check when user clicks save)
        let input: string = e.target.value
        if(input === '') {
            setInvalidName(false)
            return setChangeMade(false)
        }
        let stringCheck = checkString(input, false)
        if(stringCheck){
            setInvalidName(true)
            return setChangeMade(false)
        }
        setInvalidName(false)
        setChangeMade(true)
    }


    return (  
        <div id='profile-frame'>
            <div className='profile-top-frame'>
                <ProfilePicture image='image1' id='profile-page-pfp'/>
                <div className='profile-top-name-container'>
                    DoomDoober54
                </div>
            </div>
            <div className='profile-bottom-frame'>
                <div className='profile-bottom-stats'>
                    <h4>Player statistics</h4>
                    <div className='proflie-stats-top stats-panel-frame'>
                        <div>
                            <div className='image-small-div'></div>
                            <h3>1243</h3>
                        </div>
                    </div>
                    <div className='proflie-stats-bottom stats-panel-frame'>
                        <ul>

                        </ul>
                    </div>
                </div>
                <div className='dotted-line'>
                    
                </div>
                <div className='profile-bottom-settings'>
                    <h4>Profile settings</h4>
                    <div className='profile-change-name-box'>
                        {invalidName && <div></div>}
                        <label>Change name</label>
                        <input type='text' placeholder='DoomDoober54' onChange={(e) => {nameInputAction(e)}}></input>
                    </div>
                    <div className='profile-change-pfp-box'>
                        <label>Change profile picture</label>
                        <button className='profile-settings-button'>Select</button>
                    </div>
                    <div className='profile-delete-box'>
                        <label>Delete profile</label>
                        <button className='profile-settings-button'>Delete</button>
                    </div>
                </div>

                {
                changeMade &&
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