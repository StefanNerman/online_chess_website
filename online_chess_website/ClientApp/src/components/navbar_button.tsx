import React from 'react'

interface props {
    text: string
    click: Function
}

const NavbarButton = (props: props) => {



    return (  
        <div onClick={() => props.click()} className='navbar-button'>
            <p>{props.text}</p>
        </div>
    );
}
 
export default NavbarButton;