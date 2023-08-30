import React from 'react'



type params = {
    image: string
} & React.ComponentProps<'div'>

const ProfilePicture = ({image, ...rest}: params) => {
    return (  
        <div className='profile-top-image-container' {...rest}>
            <div className={'profile-image-big ' + image}></div>
            <div className='edit-label-small'></div>
        </div>
    );
}
 
export default ProfilePicture;