import React from 'react'

type props = {
    text: string
} & React.ComponentProps<'div'>

const NavbarButton = ({text, ...rest}: props) => {



    return (  
        <div {...rest} className='navbar-button'>
            <p>{text}</p>
        </div>
    );
}
 
export default NavbarButton;