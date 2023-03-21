import Axios from 'axios'


export function axiosPost(path: string, sendData: object): Promise<any>{
    return new Promise((resolve, reject) => {
        Axios.post(`http://localhost:44417/${path}`, sendData)
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export function axiosGet(path: string, sendData: object): Promise<any>{
    return new Promise((resolve, reject) => {
        Axios.get(`http://localhost:44417/${path}`, sendData)
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            reject(error)
        })
    })
}
