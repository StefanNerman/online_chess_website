import Axios from 'axios'






export function axiosPost(path: string, sendData: object){
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