import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Offline = () => {

    const navigate = useNavigate()

    useEffect(() =>{ 
        sessionStorage.setItem('profileExists', 'true')
        navigate('/main-menu')
    }, [])

    return (  
            <div>

            </div>
    );
}
 
export default Offline;