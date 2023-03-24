import React from 'react'
import './style.css'
import { useParams } from 'react-router-dom';

const MainMenu = () => {

    const { loginOperation } = useParams()
    console.log(loginOperation)


    return (  
        <div className="mainmenu">
           <h1>{loginOperation}</h1>
        </div>
    );
}
 
export default MainMenu;