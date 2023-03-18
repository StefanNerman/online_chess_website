import {useState} from 'react'



export function useForm(initialValue: object): [any, Function]{
    const [state, setState] = useState(initialValue)

    function setForm(name: string, value: any){
        setState(state => ({ ...state, [name]: value }))
    }

    return [state, setForm]
}
