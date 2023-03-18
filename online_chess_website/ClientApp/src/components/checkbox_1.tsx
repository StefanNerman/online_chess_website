import React, {useState} from 'react'


interface params {
    checked: boolean
    onCheck: Function | null
    onUnCheck: Function | null
}

const Checkbox1 = (params: params) => {

    const [checked, setChecked] = useState(params.checked)

    function handleChange(){
        if(checked){
            params.onUnCheck && params.onUnCheck()
            setChecked(false)
        } else {
            params.onCheck && params.onCheck()
            setChecked(true)
        }
    }

    return (  
        <input type='checkbox' className='checkbox-1' tabIndex={0}
        checked={checked} onChange={handleChange}>

        </input>
    );
}
 
export default Checkbox1;