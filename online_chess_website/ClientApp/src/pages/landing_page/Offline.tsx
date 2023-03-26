import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Offline = () => {

    const navigate = useNavigate()

    useEffect(() => navigate('/main-menu'), [])

    return (  
            <div>

            </div>
    );
}
 
export default Offline;