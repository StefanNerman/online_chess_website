import * as api from '../api/http_calls'

interface profileInfo {
    userId: number
    userRank: number
    profilePicture: string
}

export async function getProfileByUserId(userId: number): Promise<profileInfo> {
    return new Promise((resolve, reject) => {
        api.axiosGet(`api/profiles/${userId}`)
        .then(response => {
            resolve(response.data)
        })
        .catch(response => {
            reject(response.data)
        })
    })
}