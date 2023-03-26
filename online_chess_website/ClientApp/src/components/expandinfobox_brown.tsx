import React from 'react'



interface params {
    text: string
}

const ExpandInfoBox = (params: params) => {

    function expandText(){

    }


    return (  
        <div className='expandinfobox-container'>
            <p>Expand</p>
            <button onClick={expandText}></button>
            <div className='expandinfobox-text'>{params.text}</div>
        </div>
    );
}
 
export default ExpandInfoBox;