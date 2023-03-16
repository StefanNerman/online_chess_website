import React from 'react'


interface params {
    onCheck: Function | null
    onUnCheck: Function | null
}

const Checkbox1 = (params: params) => {

    //for tomorrow make the animation look better 

    return (  
        <input type='checkbox' className='checkbox-1'>

        </input>
    );
}
 
export default Checkbox1;