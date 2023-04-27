import React, {useState} from 'react'


type params = {
    checked: boolean
    onCheck: Function | null
    onUnCheck: Function | null
} & React.ComponentProps<any>

const Checkbox1 = ({onCheck, onUnCheck, checked, ...rest}: params) => {

    const [isChecked, setIsChecked] = useState(checked)

    function handleChange(){
        if(isChecked){
            onUnCheck && onUnCheck()
            setIsChecked(false)
        } else {
            onCheck && onCheck()
            setIsChecked(true)
        }
    }

    return (  
        <input type='checkbox' className='checkbox-1' tabIndex={0}
        onChange={handleChange} data-testid='checkbox-1' {...rest} checked={isChecked}>

        </input>
    );
}
 
export default Checkbox1;