import {useState} from 'react'



export default function useForm(): Array<object | Function>{
    const [state, setState] = useState({})

    function setForm(name: string, value: any){
        setState(state => ({ ...state, [name]: value }))
    }

    return [state, setForm]
}