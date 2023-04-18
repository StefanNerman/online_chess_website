import React from 'react'

interface params {
    text: string
}

const FramedTextbox = (params: params) => {



    return (  
        <h4 className='framedtextbox'>
            {params.text}
        </h4>
    );
}
 
export default FramedTextbox;