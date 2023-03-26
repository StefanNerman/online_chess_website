import React, { useEffect } from 'react'
import './style.css'
import { showNavbarController } from '../../App'

const GamePage = () => {

    useEffect(() => {
        showNavbarController(true)
    }, [])


    return (  
        <div className="gamepage">

        </div>
    );
}
 
export default GamePage;